const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = JWTtoUserID;

function JWTtoUserID(authHeader){
     let decode = jwt.decode(authHeader);
     return(decode.sub);
}