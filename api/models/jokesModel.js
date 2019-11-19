const db = require('../../data/dbConfig');

module.exports = {
    getAllJokes,
}


function getAllJokes(){
    return db('jokes')
}