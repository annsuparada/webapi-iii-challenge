const express = require('express');
const server = express();

server.use('/', (req, res) => {
    res.status(200).send('express running')
})

server.listen(8000, () => {
    console.log('server listening to 8000')
})