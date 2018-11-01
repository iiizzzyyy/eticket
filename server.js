const fs = require('fs');
const restify = require('restify');
const yenv = require('yenv');
const config = yenv('config.yaml');
const restifyPromise = require('restify-await-promise');
const eTicketController = require('./api/controllers/eTicket.js');

const { env: { NODE_ENV } } = process;
const { KEY, CRT, PORT } = config;
const isProduction = NODE_ENV == 'production';
const key = fs.existsSync(KEY) && fs.readFileSync(KEY);
const certificate = fs.existsSync(CRT) && fs.readFileSync(CRT);
const serverOptions = isProduction ? { key, certificate } : {};
const server = restify.createServer(serverOptions);

// SERVER CONFIG
server.use(restify.plugins.bodyParser());
restifyPromise.install(server);
// ENDPOINTS
server.post('/eticket', eTicketController.post);
// SERVER START
server.listen(PORT);