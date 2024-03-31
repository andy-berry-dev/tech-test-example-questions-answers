import { QueryResolvers } from '../__generated__/types/graphql';

const usersResolver: QueryResolvers['users'] = async (root, params, { knex }) =>
    knex.select('*').from('users');

export default {
    Query: {
        users: usersResolver,
    },
};
