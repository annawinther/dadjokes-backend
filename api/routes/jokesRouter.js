const router = require('express').Router();
// const restricted = require('../../middleware/restricted');
const Jokes = require('../models/jokesModel');

router.get('/', (req, res) => {
    Jokes.getAllJokes()
        .then(jokes => {
            res.status(200).json(jokes)
        })
        .catch(() => {
            res.status(500).json({ message: 'could not get all jokes...:(' })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Jokes.findJokeById(id)
        .then(joke => {
            res.status(200).json(joke)
        })
        .catch(() => {
            res.status(500).json({ message: "could not find joke with that id" })
        })
})
// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     // const { decodedJwt } = req;
//     const userId = req.body.user_id;
//     try {
//       const joke = await Jokes.findJokeById(userId, id);
//       if (!joke) {
//         return res.status(400).json({
//           error: "No joke found with the given id"
//         });
//       }
//     //   joke.public = joke.public === 1 ? true : false;
//       res.status(200).json(joke);
//     } catch (error) {
//       res.status(500).json({
//         error: error.message
//       });
//     }
//   });

router.post('/', (req, res) => {
    Jokes.addJoke(req.body)
        .then(joke => {
            // console.log("added joke!")
            res.status(201).json(joke)
        })
        .catch(() => {
            res.status(500).json({ message: "could not add joke" });
            })
 })

 router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Jokes.deleteJoke(id)
        .then(() => {
            res.status(200).json({message: `deleted joke with id of ${id}` })
        })
        .catch(error => {
            res.status(500).json({ error: error.message})
        })
 })
module.exports = router;