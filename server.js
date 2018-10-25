const fs = require('fs');
const restify = require('restify');
const yenv = require('yenv');
const config = yenv('config.yaml');

const eTicketController = require('./api/controllers/eTicket.js');

const https_options = {
  key: fs.readFileSync(config.KEY),
  certificate: fs.readFileSync(config.CRT)
};

const server = restify.createServer(https_options);
server.use(restify.plugins.bodyParser());

server.post('/', eTicketController.post);

server.listen(config.PORT, () => {
  console.log('%s listening at %s', server.name, server.url);
});