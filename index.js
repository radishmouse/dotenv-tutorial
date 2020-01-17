const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const options = {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME
};

console.log('here are your options, buddy:');
console.log(options);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  
});
