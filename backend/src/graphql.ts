import merge from 'lodash/merge';
import type { Knex } from 'knex';
import { readFileSync } from 'fs';
import path from 'path';
import usersResolvers from './resolvers/users-resolvers';
import questionsResolvers from './resolvers/questions-resolvers';

export type Context = {
    knex: Knex;
};

export const typeDefs = readFileSync(
    path.resolve(__dirname, './schema.graphql'),
    { encoding: 'utf-8' },
);

export const resolvers = merge(usersResolvers, questionsResolvers);
