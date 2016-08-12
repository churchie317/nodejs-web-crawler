const http = require("http");
const cheerio = require('cheerio');
const fs = require('fs');
const router = require('./router');

const port = 1337;
const ip = '127.0.0.1';

const server = http.createServer(router.handleRequest);
console.log('Listening on http://' + ip + ':' + port);
console.log('Magic happens on port', port);
server.listen(port, ip);
