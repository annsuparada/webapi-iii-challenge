const express = require('express');
const server = express();
const cors = require('cors');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

console.log('environment', process.env.NODE_ENV)

server.use(express.json());
server.use(cors());
server.use(logger);

server.use('/posts', postRouter);
server.use('/users', userRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );
  next();
};

module.exports = server;
