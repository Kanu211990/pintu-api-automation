const winston = require('winston');
const colorizer = winston.format.colorize();

class Logger {
  constructor(silentStat){
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({
            format: 'YY-MM-DD HH:mm:ss'
        }),
        winston.format.simple(),
        winston.format.printf(msg => 
          colorizer.colorize(msg.level, `[${msg.level.toUpperCase()}] ${msg.timestamp} ${msg.message}`)
        )
      ),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({
          silent: silentStat
        }),
      ]
    })
    
  }
  
  logInfo = (msg) => {
    return this.logger.log('info', {message : msg})
  }

  logError = async(msg) => this.logger.log('error', { message: msg })
}

module.exports = Logger