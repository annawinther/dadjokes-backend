const router = require("express").Router();
const PJokes = require('../../models/publicJokesModel');

router.get('/', (req, res) => {
  PJokes.getPublicJokes()
     .then(jokes => {
         res.status(200).json(jokes);
     })
     .catch(error => {
        res.status(500).json({
            error: error.message
          });
     })
     
  });

  module.exports = router;