const knexStringcase = require("knex-stringcase");

module.exports = {
  development: knexStringcase({
    client: "postgresql",
    connection: {
      database: "challenge",
      password: "postgres",
      user: "postgres",
    },
    migrations: {
      directory: "src/migrations",
      extension: "js",
    },
  }),
};
