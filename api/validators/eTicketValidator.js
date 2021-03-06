const error = require('restify-errors');
const dateHelper = require('../helpers/dateHelper.js');

const { validateTimestamp } = dateHelper;

module.exports = {
    validateParams: (params, next) => {
        const emailRequiredError = new error.MissingParameterError('Parameter email is required');
        const wrongDateFormatError = new error.UnprocessableEntityError('Dates must be a timestamp in miliseconds');
        const { email, closedate, departure_date, arrival_date } = params;

        !email && next(emailRequiredError);
        !validateTimestamp(closedate) && next(wrongDateFormatError);
        !validateTimestamp(departure_date) && next(wrongDateFormatError);
        !validateTimestamp(arrival_date) && next(wrongDateFormatError);
    }
}