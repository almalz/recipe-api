import winston from 'winston'
import appRoot from 'app-root-path'

const options = {
  file: {
    level: 'debug',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.splat(),
      winston.format.prettyPrint(),
    ),
  },
}

const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false, // do not exit on handled exceptions
  silent: process.env.NODE_ENV === 'test',
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console))
}

export default logger
