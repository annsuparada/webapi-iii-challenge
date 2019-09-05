require('dotenv').config()

const server = require('./server');


server.listen(8000, () => {
    console.log('server listening to 8000')
})