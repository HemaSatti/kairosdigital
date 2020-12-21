const winston = require('winston');
const express = require('express');
var http = require('http');
const app = express();

require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();


const port = process.env.PORT || 3000;
http.createServer(app).listen(port, () => winston.info(`Listening on port ${port}...`));
