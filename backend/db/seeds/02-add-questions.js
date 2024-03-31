const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
    await knex('questions').insert([
        {
            id: faker.string.uuid(),
            text: 'What is your favourite colour?',
        },
        {
            id: faker.string.uuid(),
            text: 'What is your favourite food?',
        },
    ]);
};
