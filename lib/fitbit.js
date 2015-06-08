var FitbitApiClient = require("fitbit-node"),
    config = require('../fitbit_config.json');

module.exports.client = new FitbitApiClient(
    process.env.FITBIT_CONSUMER_KEY || config.consumer_key,
    process.env.FITBIT_CONSUMER_SECRET || config.consumer_secret
);