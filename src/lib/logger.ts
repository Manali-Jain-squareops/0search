import * as winston from 'winston'

const transports = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true
  })
]

const logger = winston.createLogger({
  transports, exitOnError: false
})

export default logger
