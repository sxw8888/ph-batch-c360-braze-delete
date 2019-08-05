

const mongoose =  require('mongoose');
// const validateInteger  = require('mongoose-integer');

const transactionCustomerRecovery = new mongoose.Schema({
    ticket_guid: {
        type: String,
        required: true
    },
    dw_gc_header: {
        type: Number,
        required: true
    },
    dw_restid: {
        type: Number
    },
    ticket_number: {
        type: String
    },
    restid: {
        type: String
    },
    email_address: {
        type: String
    },
    loyalty_email_address: {
        type: String
    },
    busidaydt: {
        type: Date,
        required: true
    },
    serialzed_coupon_cd: {
        type: String,
        required: true
    },
    serialized_coupon_trigger: {
        type: Number
    },
    redeemed_serialized_coupon_cd: {
        type: String
    },
    redeemed_serialized_coupon_cd_st : {
        type: Number
    },
    created_on : {
        type: Date
    },
    updated_on: {
        type: Date
    }
});

const transactionCustomerRecoveryModel =  mongoose.model('transactions.customer_recovery', transactionCustomerRecovery, 'transactions.customer_recovery');

module.exports = transactionCustomerRecoveryModel ;
