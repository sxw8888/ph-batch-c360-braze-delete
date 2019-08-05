/*
* @author Gulshan Wadhwani
* @createdOn 03/01/2019
* @description  This is to provide logger configuration
* */
const dotenv = require('dotenv');

dotenv.config();
const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, printf
} = format;

const myFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

const logger = createLogger({
  format: combine(
    timestamp(),
    label({ label: 'home-store-update' }),
    myFormat
  ),
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL_ALL
    }),
    new transports.File({
      filename: process.env.LOG_TO_PATH,
      level: process.env.LOG_LEVEL_ALL
    })
  ]
});
module.exports = logger;
