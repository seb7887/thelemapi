const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(7000, () => {
  console.log(`Server listening on port`);
});
