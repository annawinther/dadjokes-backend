const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routes/authentication/authRoutes");
const jokesRouter = require("./routes/jokes/jokesRouter");
const publicJokesRouter = require("./routes/publicJokes/publicJokesRouter");
const restricted = require('../middleware/restricted');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/auth', authRouter);
server.use('/api/jokes', restricted, jokesRouter); 
server.use('/public-jokes', publicJokesRouter);

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

module.exports = server;