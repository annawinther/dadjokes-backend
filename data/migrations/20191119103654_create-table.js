
exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
        tbl.increments()
        tbl
            .string("username")
            .notNullable()
            .unique();
        tbl
            .string("password")
            .notNullable();
        tbl
            .string("email")
            .notNullable()
            .unique();
        tbl 
            .string("jwt", 512);
    })
    .createTable("jokes", tbl => {
        tbl.increments()
        tbl
            .string("setup")
            .notNullable();
        tbl
            .string("punchline")
            .notNullable();
        tbl
            .string("public")
            .defaultsTo(true);
        tbl
            .integer("user_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users");
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("jokes")
  .dropTableIfExists("users")
};
