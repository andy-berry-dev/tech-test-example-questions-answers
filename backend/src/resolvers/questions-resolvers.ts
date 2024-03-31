import { QueryResolvers } from '../__generated__/types/graphql';

const questionsResolver: QueryResolvers['questions'] = async (
    root,
    params,
    { knex },
) => knex.select('*').from('questions');

export default {
    Query: {
        questions: questionsResolver,
    },
};
