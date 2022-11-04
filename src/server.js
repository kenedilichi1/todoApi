const express = require('express');
const cors = require('cors');
const server = express();
const router = require('./routers/v1')


server.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
}
));
server.use(express.json());


server.use("/todo",router)







module.exports = server;
