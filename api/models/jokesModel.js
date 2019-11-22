const db = require('../../data/dbConfig');

module.exports = {
    getAllJokes,
    findUsersJoke,
    findJokeById,
    addJoke,
    deleteJoke,
    updateJoke,
}

function getAllJokes(userID){
    return db('jokes')
        .join("users", "users.id", "jokes.user_id")
        .groupBy("jokes.id", "jokes.setup", "jokes.punchline", "jokes.public", "users.username")
        .select(
        "jokes.id",
        "jokes.setup",
        "jokes.punchline",
        "jokes.public",
        "users.username as user_username",
        )
        .where({user_id:userID})      
}

function findUsersJoke(){
    return db('jokes')
}

function findJokeById(id, userID){
    return db('jokes')
        .where({ 
         id : id,
         user_id : userID || 1,
         // if user id is not provided, use "test" user id
        })
        .first()
}


  function addJoke(joke, userID){
    //TODO: Check what is submitted and add user verification
    return db('jokes').insert(joke, "id")
     .then(ids => {
            const [id] = ids;
            return findJokeById(id, userID);
        })
}

function deleteJoke(jokeId, userID){
    return db('jokes')
        .where({ id: jokeId })
        .where({user_id:userID})
        .delete()
}

 function updateJoke(jokeId, updated, userID){
    return db('jokes')
        .where({ id: jokeId })
        .where({user_id:userID}) 
        .update(updated)
}
