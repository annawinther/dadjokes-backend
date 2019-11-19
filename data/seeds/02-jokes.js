
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes').del()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        { id: 1,
          setup: "How do you check if a webpage is HTML5?",
          punchline: "Try it out on Internet Explorer",
          user_id: 1
        },
        { id: 2, 
          setup: "What did the grape do when he got stepped on?",
          punchline: "He let out a little wine",
          user_id: 1
        }
      ]);
    });
};
