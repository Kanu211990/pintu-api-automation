const mysql = require('mysql')
const util = require( 'util' );
const errorBuilder = require('../utils/errorBuilder');

class DB {
    constructor(config){
        if(!config) {
            throw errorBuilder.ConstructorParams()
        }
        this.config = config
    }

    createConnection = (dbName) => {
        const connection =  mysql.createConnection({
            host: this.config.dbHost,
            port: this.config.dbPort,
            database: dbName,
            user: this.config.dbUser,
            password: this.config.dbPassword,
            multipleStatements: true
        });

        return {
            query( sql, args ) {
              return util.promisify( connection.query )
                .call( connection, sql, args );
            },
            close() {
              return util.promisify( connection.end ).call( connection );
            }
        };
    }
}

module.exports = DB