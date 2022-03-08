const jsonSql = require('json-sql')({separatedValues:false});
const moment = require('moment');

const sqlQueryBuilder = (args) => {
    let query = ''

    if(!Array.isArray(args.values)) {
        args.values = [args.values]
    }

    args.values.forEach (values =>{ 
        let mapValues = {}

        for (let [k, v] of Object.entries(values)) {
            const snakeKey = k.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

            if(moment(v, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid()) {
                v = moment(v).format('YYYY-MM-DD HH:mm:ss')
            }
            
            mapValues[snakeKey] = v;
        }

        let sql = jsonSql.build({
            type: args.type,
            table: args.table,
            values: mapValues
        });

        query += ` ${sql.query.replaceAll('"', '`')} `
    })

    return query
}

module.exports = {
    sqlQueryBuilder
}