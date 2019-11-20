const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routes/authRoutes");
const jokesRouter = require("./routes/jokesRouter");
const publicJokesRouter = require("./routes/publicJokesRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter); 
server.use('/api/public-jokes', publicJokesRouter);

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

module.exports = server;