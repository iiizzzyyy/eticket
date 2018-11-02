const yenv = require('yenv');
const config = yenv('config.yaml');
const hubspotService = require('../services/hubSpotService.js');
const eTicketValidator = require('../validators/eTicketValidator');

const { HUBSPOT_PIPELINE_ID, HUBSPOT_PARTIAL_PAYMENT_STAGE_ID, HUBSPOT_FULL_PAYMENT_STAGE_ID } = config;
const { validateParams } = eTicketValidator;

module.exports = {
    post: async (req, res, next) => {
        const params = { ...req.body };      
        validateParams(params, next)
        const contactRepsonse = await hubspotService.contacts(params);
        const { isFullPayment } = params;
        const { data: { vid } } = contactRepsonse;
        await hubspotService.deals({
            pipeline: HUBSPOT_PIPELINE_ID,
            dealstage: isFullPayment ? HUBSPOT_FULL_PAYMENT_STAGE_ID : HUBSPOT_PARTIAL_PAYMENT_STAGE_ID,
            payment_type: isFullPayment ? 'full' : 'partial',
            vid,
            ...params,
        });

        res.send('OK');
    }
};