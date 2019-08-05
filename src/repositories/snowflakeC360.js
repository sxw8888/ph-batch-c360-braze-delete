
const snowflake = require('snowflake-sdk');
const logger = require('../config/logger.js');

const snowflakeDBConnection = async (dboptions) => {
  const snowConnectionObj = snowflake.createConnection(dboptions);
  const connectionObj = await new Promise((resolve, reject) => snowConnectionObj.connect(
    (error, response) => {
      if (error) {
        logger.log('error', `(Repository/snowflakeC360.snowflakeDBConnection) # Unable to Connect to SNOWFLAKE DB : ${JSON.stringify(error)}`);
        return reject(error);
      }
      logger.log('info', `(Repository/snowflakeC360.snowflakeDBConnection) # Connected to SNOWFLAKE DB !!: ${JSON.stringify(response)}`);
      return resolve(response);
    }
  ));
  return connectionObj;
};

const getCounts = (processDate, snowConnection) => new Promise((resolve, reject) => {
  snowConnection.execute({
    sqlText: `
                SELECT 'BRAZE_DELETE' CATEGORY,COUNT(*) TOTALCOUNTS
                FROM SANDBOX.C360.ALIAS_TESTING
     `,
    complete: (error, stmt, rows) => {
      if (error) {
        logger.log('error', `(Repository/snowflakeC360.getCounts) # Unable to execute query on SNOWFLAKE DB`);
        reject(error);
      } else {
        logger.log('info', `(Repository/snowflakeC360.getCounts) # executed query on SNOWFLAKE DB ${JSON.stringify(rows)} `);
        resolve(rows);
      }
    }
  });
});
const fetchHomeStoreUpdates = (processDate, snowConnection, offset, batchSize) => new Promise(
  (resolve, reject) => {
    snowConnection.execute({
      sqlText: `
                SELECT CRM_ID
                FROM SANDBOX.C360.ALIAS_TESTING
		ORDER BY 1
                LIMIT ${batchSize} OFFSET ${offset} 
            `,
      complete: (error, stmt, rows) => {
        if (error) {
          logger.log('error', `(Repository/snowflakeC360.fetchHomeStoreUpdates) # Unable to execute query on SNOWFLAKE DB`);
          reject(error);
        } else {
          logger.log('info', `(Repository/snowflakeC360.fetchHomeStoreUpdates) # executed query on SNOWFLAKE DB`);
          resolve(rows);
        }
      }
    });
  }
);
module.exports = {
  snowflakeDBConnection,
  getCounts,
  fetchHomeStoreUpdates
};
