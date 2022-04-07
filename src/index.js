const express = require ('express');
const cors = require('cors');
const PORT = 5001;
const server = require('./server')


server.listen(PORT, function(){
    console.log(`server running on ${PORT}` )
})