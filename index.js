const http = require('http');
const cors = require('cors');
const app = require('./app');

// app.use(cors())

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, console.log('PORT running on '+port));