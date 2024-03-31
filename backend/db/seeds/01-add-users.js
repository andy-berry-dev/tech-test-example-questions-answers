const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
    await knex('users').insert(
        [...Array(10).keys()].map(() => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
        })),
    );
};
