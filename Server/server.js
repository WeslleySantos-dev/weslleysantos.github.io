const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

console.log(port);
console.log([process.env.port]);

server.listen(port);

