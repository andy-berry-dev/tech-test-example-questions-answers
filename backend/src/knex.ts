import knex from 'knex';

export const initDb = () =>
    knex({
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: parseInt(process.env.DB_PORT || '', 10),
        },
    });
