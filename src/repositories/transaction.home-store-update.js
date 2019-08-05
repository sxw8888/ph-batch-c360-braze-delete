
const mongoose = require('mongoose');
const logger = require('../config/logger.js');
const mongoCustomerRecoveryModel =  require('../models/transactions.home-store-update.js');

const mongoDBConnection = async (dbURL, dbOptions) => {
    mongoose.set('debug', (collection, method, query, doc, options) => {
            logger.log('debug', `(Mongoose) # ${JSON.stringify(collection)} # ${JSON.stringify(method)} # ${JSON.stringify(query)} #### #${JSON.stringify(doc)} #### `);
    });
    // mongoose.set('debug', true);
    // const db = mongoose.connection;
    const mongoConnection = await mongoose.connect(dbURL, dbOptions)
        .catch(error => {
            logger.log('error', `(Repository/transactions.home-store-update.mongoDBConnection) # There was an error in connecting to MONGO DB : ${JSON.stringify(error)}`);
            return Promise.reject(error);
    });
    logger.log('info', `(Repository/transactions.home-store-update.mongoDBConnection) # Connected to MONGO DB !!: ${typeof mongoConnection}`);
    return mongoConnection;
};

const insertCustomerRecovery = async (documents) => {
    logger.log('info', `(Repository/transactions.home-store-update.insertCustomerRecovery) # loadToMongo entered with ...${documents.length} `);
    logger.log('debug', `(Repository/transactions.home-store-update.insertCustomerRecovery) # loadToMongo entered with ...${JSON.stringify(documents)} `);

    const listSerializedCodes = documents.map(row => row.serialzed_coupon_cd);
    const purgeStatus= await mongoCustomerRecoveryModel.deleteMany({serialzed_coupon_cd: {$in: listSerializedCodes }}).exec()
        .catch(error => {
            logger.log('error', `(Repository/transactions.home-store-update.purgeCustomerRecovery ) # Unable to purge mongo home-store-update : ${JSON.stringify(error)}`)
            return Promise.reject(error);
        });
    const insertStatus = await mongoCustomerRecoveryModel.insertMany(documents)
        .catch(error => {
            logger.log('error', `(Repository/transactions.home-store-update.insertCustomerRecovery) # Unable to insert mongo home-store-update : ${JSON.stringify(error)}`)
            return Promise.reject(error);
        });
    logger.log('info', `(Repository/transactions.home-store-update.insertCustomerRecovery) # purged from mongo home-store-update : ${purgeStatus}, inserted to mongo home-store-update : ${insertStatus.length} `);
    return Promise.resolve(insertStatus);
};

const purgeCustomerRecovery = async (documents) => {
    logger.log('info', `(Repository/transactions.home-store-update.purgeCustomerRecovery ) # purge from Mongo entered with ...${documents.length} `);
    logger.log('debug', `(Repository/transactions.home-store-update.insertCustomerRecovery) # purge from Mongo entered with ...${JSON.stringify(documents)} `);

    const listSerializedCodes = documents.map(row => row.redeemed_serialized_coupon_cd);
    const purgeStatus= await mongoCustomerRecoveryModel.deleteMany({serialzed_coupon_cd: {$in: listSerializedCodes }})
        .catch(error => {
            logger.log('error', `(Repository/transactions.home-store-update.purgeCustomerRecovery ) # Unable to purge mongo home-store-update : ${JSON.stringify(error)}`)
            return Promise.reject(error);
        });
    logger.log('info', `(Repository/transactions.home-store-update.purgeCustomerRecovery ) # purged mongo home-store-update : ${JSON.stringify(purgeStatus)} `);
    return Promise.resolve(purgeStatus.deleteCount);
};

module.exports =  {
    mongoDBConnection
    ,insertCustomerRecovery
    ,purgeCustomerRecovery
};