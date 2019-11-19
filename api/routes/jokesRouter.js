const router = require('express').Router();

const Jokes = require('../models/jokesModel');

router.get('/', (req, res) => {
    Jokes.getAllJokes()
        .then(jokes => {
            res.status(200).json(jokes)
        })
        .catch(() => {
            res.status(500).json({ message: 'could not get all jokes...:('})
        })
})

module.exports = router;