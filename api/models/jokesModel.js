const db = require('../../data/dbConfig');

module.exports = {
    getAllJokes,
    findUsersJoke,
    findJokeById,
    addJoke,
    deleteJoke,
    updateJoke,
}

function getAllJokes(){
    return null
//     return db('jokes')
//         .join("users", "users.id", "jokes.user_id")
//         .groupBy("jokes.id", "jokes.setup", "jokes.punchline", "jokes.public", "users.username")
//         .select(
//         "jokes.id",
//         "jokes.setup",
//         "jokes.punchline",
//         "jokes.public",
//         "users.username as user_username",
//         )      
}

function findUsersJoke(userId){
    return db('jokes')
        .where({ user_id: userId })
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
function findJokeById(id){
    return db('jokes')
        .where({ id })
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

async function addJoke(joke){
    const [id] = await db('jokes').insert(joke, "id");

    return db('jokes')
        .where({ id })
        .first()
}

function deleteJoke( jokeId){
    return db('jokes')
        .where({ id: jokeId })
        .delete()
}

function updateJoke(userId, jokeId, updated){
    return db('jokes')
        .where({ user_id: userId, id: jokeId })
        .update(updated)
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