const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/authModels');
const secrets = require('../../config/secret');
const db = require('../../data/dbConfig');

router.post('/register', async (req, res) => {
    let { email, password, username } = req.body;
        if (!email || !password || !username) {
          return res.status(400).json({
            error: "`email`, `username` and `password` are required!"
          });
        }
    const hash = bcrypt.hashSync(password, 10);
    // user.password = hash;
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
    }
    try {
        const users = await Users.addUser(newUser)
        res.status(201).json(users)
    } catch (error){
        res.status(500).json({ message: 'could not register new user' })
    }
})
// router.post("/register", async (req, res) => {
//     let { email, password, username } = req.body;
//     if (!email || !password || !username) {
//       return res.status(400).json({
//         error: "`email`, `username` and `password` are required!"
//       });
//     }
//     try {
//       const hash = bcrypt.hashSync(password, 10);
//       const [id] = await db("users").insert(
//         {
//           email,
//           username,
//           password: hash
//         },
//         "id"
//       );
//       const [user] = await db("users").where({ id });
//       return res.status(201).json(user);
//     } catch (error) {
//       res.status(500).json({
//         error: error.message
//       });
//     }
//   });

router.post('/login',  (req, res) => {
    let {username, password } = req.body;
   
    Users.findBy({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ 
                    message: `Welcome ${user.username}. You're logged in!`,
                    token: token
                })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'could not log in this user' })
        })
});

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({
//         error: "`username` and `password` are required!"
//       });
//     }
  
//     try {
//       const [user] = await db("users").where({ username });
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user);
//         await db("users")
//           .where({ username })
//           .update({ jwt: token });
//         return res.status(200).json({ message: `Welcome ${user.username}`, token });
//       } else {
//         return res.status(401).json({
//           error: "Invalid credentials"
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         error: error.message
//       });
//     }
//   });

function generateToken(user){
    const payload = {
        sub: user.id,
        username: user.username    
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;