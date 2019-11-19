const knex = require('knex');

const knexConfig = require("../knexfile.js");
// eslint-disable-next-line no-undef
const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[dbEnv]);