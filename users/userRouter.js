const express = require('express');
const router = express.Router();
const db = require('./userDb');

router.use(express.json());

router.post('/', (req, res) => {
    const name = req.body;
    if(!name) {
        res.status(400)
        .json({errorMessage: "Please provide name for the post."})
    } else{
        db.insert(name)
          .then(user => {
              res.status(201).json(user)
          })
          .catch(() => {
              res.status(500)
              .json({errorMessage: 'There was an error while saving the user to the database'})
          })
    }
    
});

router.post('/:id/posts', (req, res) => {

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

router.get('/:id', (req, res) => {
    const id  = req.params.id;
    db.getById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.'})
        }
        
    })
    .catch(() => {
        res
        .status(500)
        .json({errorMessage: 'The users information could not be retrieved'})
    })
});

router.get('/:id/posts', (req, res) => {
    const id = req.params.id
    db.getUserPosts(id)
    .then(user => {
        if(user[0]) {
            res.status(200).json(user)
        } else {
            res
            .status(404)
            .json({ message: 'The post comments with the specified ID does not exist.'})
        }
    })
    .catch(() => {
        res
        .status(500)
        .json({ errorMessage: 'The post comments information could not be retrieved.' });
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(user => {
        if(user) {
            res.status(200).json({message: 'the user was deleted.'})
        } else {
            res
            .status(404)
            .json({ message: 'The item with the specified ID does not exist.' })
        }
        
    })
    .catch(() => {
        res
        .status(500)
        .json({ errorMessage: 'The user could not be removed' })
    })
});

router.put('/:id', (req, res) => {
    const name = req.body;
    const id = req.params.id
    if (!name) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name for the post." })
    } else {
        db.update(id, name)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404)
                .json({ message: 'The user with the specified ID does not exist.'})
            }
            
        })
        .catch(() => {
            res
            .status(500)
            .json({errorMessage: 'The post information could not be modified.' })
        })
    }
})

//custom middleware

function validateUserId(req, res, next) {
    
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
