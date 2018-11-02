const _ = require('lodash');
const yenv = require('yenv');
const config = yenv('config.yaml');

const { HUBSPOT_CONTACTS_PARAMS, HUBSPOT_DEALS_PARAMS, CUSTOM_CONTACTS_PARAMS, CUSTOM_DEALS_PARAMS } = config;

module.exports = {
    parseContactsParams: (params) => ({
        'properties': _.flatMap(
            _.pick(params, [...HUBSPOT_CONTACTS_PARAMS, ...CUSTOM_CONTACTS_PARAMS]), (value, key) => ({ 'property': key, value })
        )
    }),
    parseDealsParams: (params) => ({
        'associations': {
            'associatedVids': params.vid ? [ params.vid ] : [] 
        },
        'properties': _.flatMap(
            _.pick(params, [...HUBSPOT_DEALS_PARAMS, ...CUSTOM_DEALS_PARAMS]), (value, key) => ({ 'name': key, value })
        )
    }) 
}