const router = require('express').Router();
// const restricted = require('../../middleware/restricted');
const Jokes = require('../models/jokesModel');
const JWTtoUserID = require('../../middleware/jwt');

router.get('/', (req, res) => {
    const authHeader = req.headers.authorization;
    const userID = JWTtoUserID(authHeader);

    Jokes.getAllJokes(userID)
        .then(jokes => {
            res.status(200).json(jokes)
        })
        .catch((error) => {
            res.status(500).json({ message: 'could not get all jokes...:(' })
        })
})

router.get('/:id', (req, res) => {
    const authHeader = req.headers.authorization;
    const userID = JWTtoUserID(authHeader);

    const id = req.params.id
    Jokes.findJokeById(id, userID)
        .then(joke => {
            res.status(200).json(joke)
        })
        .catch(() => {
            res.status(500).json({ message: "could not find joke with that id" })
        })
})
// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const { decodedToken } = req;
//     const userId = decodedToken.sub;
//     try {
//       const joke = await Jokes.findJokeById(userId, id);
//       if (!joke) {
//         return res.status(400).json({
//           error: "No joke found with the given id"
//         });
//       }
    //   joke.public = joke.public === 1 ? true : false;
  //     res.status(200).json(joke);
  //   } catch (error) {
  //     res.status(500).json({
  //       error: error.message
  //     });
  //   }
  // });

router.post('/', (req, res) => {

    Jokes.addJoke(req.body)
        .then(joke => {
            res.status(201).json(joke)
        })
        .catch(() => {
            res.status(500).json({ message: "could not add joke" });
            })
 })

 router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const authHeader = req.headers.authorization;
    const userID = JWTtoUserID(authHeader);

    Jokes.deleteJoke(id, userID)
        .then(() => {
            res.status(200).json({ message: `deleted joke with id of ${id}` })
        })
        .catch(error => {
            res.status(500).json({ error: error.message})
        })
 })

 router.put('/:id', (req, res) => {
   const id = req.params.id;
   const body = req.body;

  const authHeader = req.headers.authorization;
  const userID = JWTtoUserID(authHeader);

   Jokes.updateJoke(id, body, userID)
   .then(joke => {
     res.status(200).json({ message: `Joke with id of ${id} has been updated successfully!`, joke})
   })
   .catch(err => {
     res.status(500).json({ error: err.message})
   })
 })


module.exports = router;