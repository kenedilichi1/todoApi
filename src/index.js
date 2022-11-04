const express = require ('express');
const cors = require('cors');
const server = require('./server');
const PORT = 5001;


server.listen(PORT, function(){
    console.log(`server running on ${PORT}`);
})