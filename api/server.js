const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const authRouter = require("./routes/authRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
// server.use('/api/', authRouter);

server.get('/', (req, res) => {
    res.status(200).json("Server running")
})

module.exports = server;