import {
    QueryResolvers,
    MutationResolvers,
} from '../__generated__/types/graphql';

const questionsResolver: QueryResolvers['questions'] = async (
    root,
    params,
    { knex },
) => knex.select('id', 'text').from('questions');

const addQuestionMutation: MutationResolvers['addQuestion'] = async (
    root,
    { text },
    { knex },
) => {
    if (typeof text !== 'string' || text.length < 1) {
        throw new Error('Text must be provided');
    }
    const [{ id }] = await knex
        .insert({ text })
        .returning('id')
        .into('questions');
    return knex.first('id', 'text').from('questions').where({ id });
};

export default {
    Query: {
        questions: questionsResolver,
    },
    Mutation: {
        addQuestion: addQuestionMutation,
    },
};
