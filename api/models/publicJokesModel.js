const db = require("../../data/dbConfig");

function getPublicJokes(){
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
        .where({ public: "true" })
}


module.exports =  getPublicJokes;