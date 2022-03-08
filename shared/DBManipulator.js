const errorBuilder = require('../utils/errorBuilder');
const config = require('../config')

class DBManipulator {
    constructor(logger, db){
        if(!logger || !db) {
            throw errorBuilder.ConstructorParams()
        }
        this.logger = logger
        this.db = db
        this.config = config
    }

    seed = async (action,type) => {
        if (!this.config.integratedEnv) {
            return
        }

        const dir = type.split('/')

        const seedConfig = require(`../data/${dir[0]}/seed/${dir[1]}Seed`)
        const dbConn = this.db.createConnection(seedConfig.dbName)

        try {
            await dbConn.query(seedConfig[action]);   
            this.logger.logInfo(`success ${action} ${seedConfig.tableName}`)         
        } catch ( err ) {
            throw err
        } finally {
            await dbConn.close();
        }
    }

    use = (dbName) => {
        this.dbConn = this.db.createConnection(dbName)
        return this
    }

    exec = async (query) => {
        let res
        
        try {
            res = await this.dbConn.query(query)
        } catch ( err ) {
            this.logger.loggerError(`query ${err}`)
            throw err
        } finally {
            this.logger.logInfo(`query ${query} success`)
            return JSON.parse(JSON.stringify(res))
        }
    }

    close = async () => {
        await this.dbConn.close();
    }
}

module.exports = DBManipulator