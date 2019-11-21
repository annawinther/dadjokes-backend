const db = require('../../data/dbConfig');
const JWTtoUserID = require('../../middleware/jwt');

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
        .where({user_id:JWTtoUserID()}) 
}
// async function findUsersJoke(userId) {
//     const jokes = await db("jokes")
//       .join("users", "users.id", "jokes.user_id")
//       .groupBy("jokes.id", "jokes.setup", "jokes.punchline", "jokes.private", "users.username")
//       .select(
//         "jokes.id",
//         "jokes.setup",
//         "jokes.punchline",
//         "jokes.private",
//         "users.username as author"
//       )
//       .where({ "jokes.user_id": userId });
  
//     return jokes;
//   }
function findJokeById(id, userID){
    return db('jokes')
        .where({ id })
        .where({user_id:userID}) 
        .first()
    
}
// async function findJokeById (userId, jokeId) {
//     const [joke] = await db("jokes")
//       .join("users", "users.id", "jokes.user_id")
//       .groupBy("jokes.id")
//       .select(
//         "jokes.id",
//         "jokes.setup",
//         "jokes.punchline",
//         "jokes.public",
//         "users.username as author"
//       )
//       .where({
//         "jokes.user_id": userId,
//         "jokes.id": jokeId
//       });
//     return joke;
// }

 function addJoke(joke){

    //TODO: Check what is submitted and add user verification
    
    return db('jokes').insert(joke, "id")
     .then(ids => {
            const [id] = ids;
            return findJokeById(id);
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
        // .then(ids => {
        //     const [id] = ids;
        //     return findJokeById(id);
        // })
}
// async function findJokesById(userId, jokeId, options = { filter: {} }){
//     const [joke] = await db("jokes").where({
//       user_id: userId,
//       id: jokeId,
//       ...options.filter
//     });
//     return joke;
//   }

// async function addJoke(userId, joke) {
//    const id = await db('jokes').insert({ ...joke, user_id: userId }, "id" )

//    return findJokesById(userId, id)
// }