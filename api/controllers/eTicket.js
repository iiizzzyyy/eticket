const error = require('restify-errors');
const hubspotService = require('../services/hubspot.js');
const yenv = require('yenv');
const config = yenv('config.yaml');

const { HUBSPOT_PIPELINE_ID, HUBSPOT_PARTIAL_PAYMENT_STAGE_ID, HUBSPOT_FULL_PAYMENT_STAGE_ID } = config;

module.exports = {
    post: async (req, res, next) => {
        const params = { ...req.body };
        const { email } = params;
        !email && res.send(new error.MissingParameterError('email is required'));
        const contactRepsonse = await hubspotService.contacts(params);
        const { data: { vid } } = contactRepsonse;
        const dealResponse  = await hubspotService.deals({
            pipeline: HUBSPOT_PIPELINE_ID,
            dealstage: params.isFullPayment ? HUBSPOT_FULL_PAYMENT_STAGE_ID : HUBSPOT_PARTIAL_PAYMENT_STAGE_ID,
            vid,
            ...params,
        });

        res.send('OK');
    }
};