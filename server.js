const fs = require('fs');
const restify = require('restify');
const yenv = require('yenv');
const config = yenv('config.yaml');
const restifyPromise = require('restify-await-promise');
const eTicketController = require('./api/controllers/eTicket.js');

const { KEY, CRT, PORT } = config
const serverOptions = { key: fs.readFileSync(KEY), certificate: fs.readFileSync(CRT) };
const server = restify.createServer(serverOptions);
// SERVER CONFIG
server.use(restify.plugins.bodyParser());
restifyPromise.install(server);
// ENDPOINTS
server.post('/', eTicketController.post);
// SERVER START
server.listen(PORT);