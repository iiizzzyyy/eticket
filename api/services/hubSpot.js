const axios = require('axios');
const yenv = require('yenv');
const config = yenv('config.yaml');
const hubSpotHelper = require('../helpers/hubSpotHelper.js');

const { HUBPSOT_CONTACTS_API_URL, HUBPSOT_DEALS_API_URL, HUBSPOT_API_KEY } = config;
const contactsUrl = email => `${HUBPSOT_CONTACTS_API_URL}/${email}/?hapikey=${HUBSPOT_API_KEY}`;
const dealsUrl = `${HUBPSOT_DEALS_API_URL}?hapikey=${HUBSPOT_API_KEY}`;
 

module.exports = {
    contacts: (params) => axios.post(contactsUrl(params.email), hubSpotHelper.parseContactsParams(params)),
    deals: (params) => axios.post(dealsUrl, hubSpotHelper.parseDealsParams(params)),
}