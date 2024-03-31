const dotenv = require('dotenv');

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'pg',
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
    },
    migrations: {
        schemaName: 'public',
        tableName: 'migrations',
        directory: `${__dirname}/db/migrations`,
    },
    seeds: { directory: `${__dirname}/db/seeds` },
};
