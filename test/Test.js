const glob = require('glob');
const path = require('path');
const config = require('../config');
const svcGlobPatterns = 'service/**/*.js'
const reqGlobPatterns = 'models/**/*Request.js'
const respGlobPatterns = 'models/**/*Response.js'
const Logger = require('../shared/Logger');
const DB = require('../shared/DB');
const DBManipulator = require('../shared/DBManipulator');

process.on('beforeExit', (code) => {
    console.log('Process exit event with code: ', code);
});

class Test {
    constructor () {
        this.service = {}
        this.resource = {}
        this.model = {}
    }

    setup = () => {
        this.#setResource()
        this.#setModel()
        this.#setService()
        
        this.resource.Logger.logInfo('setup test success, running test(s) ...')
    }

    test = (promise) => {
        return (done) => {
            promise(this.service, this.model, this.resource)
                .then(() => done()).catch(done);
        };
    }

    #setResource = () => {
        this.resource = {
            Config: config,
        }

        const logger =  new Logger(config.silentLogger)
        if (logger instanceof Logger === false ){
            console.log('instatiate Logger error')
        }

        this.resource.Logger = logger
        logger.logInfo('instatiate Logger success')

        try {
            const db = new DB(config)
            if (db instanceof DB){
                this.resource.DB = db
                this.resource.Logger.logInfo('instatiate DB success')
            } else {
                this.resource.Logger.logError(`instatiate DB error`)
            }
        } catch (err) {
            this.resource.Logger.logError(`instatiate DB : ${err}`)
        }   
        
        try {
            const manipulator = new DBManipulator(this.resource.Logger, this.resource.DB)
            if (manipulator instanceof DBManipulator){
                this.resource.DBManipulator = manipulator
                this.resource.Logger.logInfo('instatiate DBManipulator success')
            }
        } catch (err) {
            this.resource.Logger.logError(`instatiate DBManipulator error`)
        }   
    }

    #setService = () => {
        let svcFiles = glob.sync(svcGlobPatterns);
        
        svcFiles.forEach (file =>{
            const serviceName = path.basename(file, '.js')
            const serviceClass = require(`../${file}`)
            if(serviceName !== serviceClass.name) {
                this.resource.Logger.logError(`instatiate ${serviceName} error : different fileName (${serviceName}) and className (${serviceClass.name})`)
            } else {
                try {
                    const service = eval(`new serviceClass(this.resource, this.model)`)
                    if (service instanceof serviceClass){
                        this.service[serviceName] = service
                        this.resource.Logger.logInfo(`instatiate ${serviceName} success`)
                    }
                } catch (err) {
                    this.resource.Logger.logError(`instatiate ${serviceName} ${err}`)
                }
            }
        })
    }

    #setModel = () => {
        let reqFiles = glob.sync(reqGlobPatterns);
        let respFiles = glob.sync(respGlobPatterns);
        
        reqFiles.forEach (file =>{
            const requestModelName = path.basename(file, '.js')
            const requestModelClass = require(`../${file}`)
            if(requestModelName !== requestModelClass.name) {
                this.resource.Logger.logError(`instatiate ${requestModelName} error : different fileName (${requestModelName}) and className (${requestModelClass.name})`)
            } else {
                try {
                    const service = eval(`new requestModelClass(this.resource)`)
                    if (service instanceof requestModelClass){
                        this.model[requestModelName] = service
                        this.resource.Logger.logInfo(`instatiate ${requestModelName} success`)
                    }
                } catch (err) {
                    this.resource.Logger.logError(`instatiate ${requestModelName} ${err}`)
                }
            }
        })

        respFiles.forEach (file =>{
            const responseModelName = path.basename(file, '.js')
            const responseModelClass = require(`../${file}`)
            if(responseModelName !== responseModelClass.name) {
                this.resource.Logger.logError(`instatiate ${responseModelName} error : different fileName (${responseModelName}) and className (${responseModelClass.name})`)
            } else {
                try {
                    const service = eval(`new responseModelClass(this.resource)`)
                    if (service instanceof responseModelClass){
                        this.model[responseModelName] = service
                        this.resource.Logger.logInfo(`instatiate ${responseModelName} success`)
                    }
                } catch (err) {
                    this.resource.Logger.logError(`instatiate ${responseModelName} ${err}`)
                }
            }
        })
    }

}

module.exports = new Proxy(new Test(), {
get: function (target, name) {
  return name in target ? target[name].bind(target) : target.domain[name];
}
});
