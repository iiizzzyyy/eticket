const fs = require('fs');
const restify = require('restify');
const yenv = require('yenv');
const config = yenv('config.yaml');
const restifyPromise = require('restify-await-promise');
const eTicketController = require('./api/controllers/eTicketController.js');

const { env: { NODE_ENV } } = process;
const { KEY, CRT, PORT, CA } = config;
const isProduction = NODE_ENV == 'production';
const key = fs.existsSync(KEY) && fs.readFileSync(KEY);
const certificate = fs.existsSync(CRT) && fs.readFileSync(CRT);
const ca = fs.existsSync(CA) && fs.readFileSync(CA);
const requestCert = true;
const rejectUnauthorized = true;
const serverOptions = isProduction ? { key, certificate, ca, requestCert, rejectUnauthorized} : {};
const server = restify.createServer(serverOptions);

// SERVER CONFIG
server.use(restify.plugins.bodyParser());
restifyPromise.install(server);

// ENDPOINTS
server.post('/eticket', eTicketController.post);
// SERVER START
server.listen(PORT);