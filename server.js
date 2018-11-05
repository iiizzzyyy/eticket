const fs = require('fs');
const restify = require('restify');
const yenv = require('yenv');
const config = yenv('config.yaml');
const restifyPromise = require('restify-await-promise');
const eTicketController = require('./api/controllers/eTicketController.js');

const { KEY, CRT, PORT, CA } = config;
const key = fs.existsSync(KEY) && fs.readFileSync(KEY);
const certificate = fs.existsSync(CRT) && fs.readFileSync(CRT);
const ca = fs.existsSync(CA) && fs.readFileSync(CA);
const requestCert = true;
const rejectUnauthorized = true;
const serverOptions = { key, certificate, ca, requestCert, rejectUnauthorized };
const server = restify.createServer(serverOptions);

// SERVER CONFIG
server.use(restify.plugins.bodyParser());
restifyPromise.install(server);

//PRE HOOK
server.pre((req, res, next) => console.log('NEW REQUEST:', req))

// ENDPOINTS
server.post('/eticket', eTicketController.post);
server.get('/', (req, res, next) => res.send('BIEN'));
// SERVER START
server.listen(PORT, () => console.log('%s listening at %s', server.name, server.url));