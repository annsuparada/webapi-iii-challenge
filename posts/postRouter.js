const express = 'express';
const postDb = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Hello from postRouter')
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;