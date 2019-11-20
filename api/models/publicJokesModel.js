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
// const paginateJokes = (jokes, results, page, endIndex, startIndex) => {
//   if (endIndex < jokes.length) {
//     results.next = page + 1;
//   }
//   if (startIndex > 0) {
//     results.previous = page - 1;
//   }

//   if (!jokes[endIndex]) {
//     results.warning = "last page";
//   }

//   results.results = jokes.slice(startIndex, endIndex);
//   return results;
// };

module.exports = { getPublicJokes, 
    // paginateJokes 
};