const express = require('express');
const router = express.Router();
const db = require('./postDb')

router.use(express.json());

router.get('/', (req, res) => {
    db.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(() => {
        res
        .status(500)
        .json({errorMessage: 'The posts information could not be retrieved'})
    })
});

router.get('/:id', (req, res) => {
    const id  = req.params.id;
    db.getById(id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.'})
        }
        
    })
    .catch(() => {
        res
        .status(500)
        .json({errorMessage: 'The posts information could not be retrieved'})
    })

});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(post => {
        if(post) {
            res.status(200).json({message: 'the post was deleted.'})
        } else {
            res
            .status(404)
            .json({ message: 'The item with the specified ID does not exist.' })
        }
        
    })
    .catch(() => {
        res
        .status(500)
        .json({ errorMessage: 'The post could not be removed' })
    })
});

router.put('/:id', (req, res) => {
    const text = req.body;
    const id = req.params.id
    if (!text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the post." })
    } else {
        db.update(id, text)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404)
                .json({ message: 'The post with the specified ID does not exist.'});
            }
            
        })
        .catch(() => {
            res
            .status(500)
            .json({errorMessage: 'The post information could not be modified.' });
        })
    }
    
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;