const dotenv = require('dotenv');
dotenv.config();

const  logger = require('./config/logger.js');
const mergeData = require('./services/mergeData.js');

async function init() {
         console.log('braze key : '+ process.env.BRAZE_API_KEY);
    //logger.log( 'info',` (braze key) # $process.env.BRAZE_API_KEY);
	logger.log('info', `(home-store-update) # Started`);
    const customerRecoveryStatus = await mergeData.mergeCustomerRecovery();
    logger.log('info', `(home-store-update) # Ended! ${JSON.stringify(customerRecoveryStatus)}`);
    return true;
}

init();
