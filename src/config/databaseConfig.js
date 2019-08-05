/*
* @author Gulshan Wadhwani
* @createdOn 03/01/2019
* @description  This is to load database configurations
* */
const dotenv = require('dotenv');

dotenv.config();

const blueBird = require('bluebird');
const logger = require('./logger.js');

// define database options for connection
const mongoDBOptions = {
  dbName: process.env.DBNAME,
  autoReconnect: true,
  reconnectTries: Infinity,
  reconnectInterval: parseInt(process.env.RECONNECT_INTERVAL, 10),
  useNewUrlParser: true,
  poolSize: parseInt(process.env.POOL_SIZE, 10),
  keepAlive: true,
  socketTimeoutMS: parseInt(process.env.SOCKET_TIMEOUT_MS, 10),
  connectTimeoutMS: parseInt(process.env.CONNECTION_TIMEOUT_MS, 10),
  promiseLibrary: blueBird
};

const snowflakeDBOption = {
    account: process.env.SNOWFLAKE_ACCOUNT
    ,username: process.env.SNOWFLAKE_USER
    ,password: process.env.SNOWFLAKE_PASSWORD
    ,database: process.env.SNOWFLAKE_DATABASE
    ,schema: process.env.SNOWFLAKE_SCHEMA
    ,warehouse: process.env.SNOWFLAKE_WAREHOUSE
    ,role: process.env.SNOWFLAKE_ROLE
    ,region: process.env.SNOWFLAKE_REGION
};

//logger.log('info', process.env.DBURL);
//logger.log('info', JSON.stringify(mongoDBOptions));
logger.log('info', JSON.stringify(snowflakeDBOption));

module.exports = {
    mongoDBOptions
    ,snowflakeDBOption
};
