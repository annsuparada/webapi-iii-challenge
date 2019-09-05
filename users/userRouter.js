const express = require('express');
const router = express.Router();
const db = require('./userDb');
const postDb = require('../posts/postDb')


router.use(express.json());


router.post('/', validateUser, (req, res) => {
    const name = req.body;
    db.insert(name)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500)
            .json({errorMessage: 'There was an error while saving the user to the database'})
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    postDb.insert({text: req.body.text, user_id: req.user.id})
        .then(response => {
            res.status(201).json({createdPost: response})
        })
        .catch(() => {
            res.status(500)
            .json({errorMessage: 'There was an error while saving the post to the database'})
        })
});

router.get('/', (req, res) => {
    db.get()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => {
        res.status(500)
        .json({errorMessage: 'The posts information could not be retrieved'})
    })
});

router.get('/:id', validateUserId, (req, res) => {
    const id  = req.params.id;
    db.getById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => {
        res
        .status(500)
        .json({errorMessage: 'The users information could not be retrieved'})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id
    console.log('idType', typeof(id))
    postDb.get()
    .then(posts => {
            res.status(200).json(posts.filter(item => item.user_id === Number(id)))
    })
    .catch(() => {
        res
        .status(500)
        .json({ errorMessage: 'The post comments information could not be retrieved.' });
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(user => {
        res.status(200).json({message: 'the user was deleted.'})
    })
    .catch(() => {
        res
        .status(500)
        .json({ errorMessage: 'The user could not be removed' })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const name = req.body.name;
    const id = req.params.id
        db.update(id, {name: name})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(() => {
            res
            .status(500)
            .json({errorMessage: 'The post information could not be modified.' })
        })
})

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    db.getById(Number(id))
        .then(user => {
            if(user){
                req.user = user
                next()
            } else {
                res.status(400).json({ message: 'Invalid user id' })
            }
        })
        .catch(() =>{
                res.status(500)
                .json({ errorMessage: "error" })
            })
};

function validateUser(req, res, next) {
    if(!req.body) res.status(400).json({ message: "missing user data" })
    if(!req.body.name) res.status(400).json({ message: "missing required name field" })
    next()
};

function validatePost(req, res, next) {
    if(!req.body) res.status(400).json({ message: "missing post data" })
    if(!req.body.text) res.status(400).json({ message: "missing required text field" })
    next()
};

module.exports = router;
