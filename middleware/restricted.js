const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
// const db = require('../data/dbConfig');

function restricted(req, res, next){
    const authHeaderIsPresent = req.headers.authorization;

    if(authHeaderIsPresent){
        jwt.verify(authHeaderIsPresent, secret.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message:  'you cannot enter without logging in' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(403).json({ you: 'shall not pass!'})
    }
}

module.exports = restricted;