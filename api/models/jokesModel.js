const db = require('../../data/dbConfig');

module.exports = {
    getAllJokes,
    findUsersJoke,
}


function getAllJokes(){
    return db('jokes')
}

function findUsersJoke(userId){
    return db('jokes')
        .where({ user_id: userId })
}