const knex = require('knex')({
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: process.env.PASSWORD,
        database: "sprint4",
    }
});

module.exports = knex