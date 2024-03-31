import Knex from 'knex';
import mockKnex from 'mock-knex';
import { ApolloServer } from '@apollo/server';
import { expect } from 'chai';

import { Context, typeDefs, resolvers } from '../graphql';

const db = mockKnex.getTracker();

describe('Questions resolvers => Query', () => {
    let knex: Knex.Knex;
    let apolloServer: ApolloServer<Context>;

    beforeEach(() => {
        knex = Knex({
            client: 'postgres',
        });
        mockKnex.mock(knex);
        db.install();
        apolloServer = new ApolloServer<Context>({
            typeDefs,
            resolvers,
        });
    });

    afterEach(() => {
        if (typeof knex !== 'undefined') {
            mockKnex.unmock(knex);
        }
    });

    describe('questions', () => {
        it('returns the list of questions from the DB', async () => {
            db.on('query', (query) =>
                query.response([
                    { id: 1, text: 'question 1' },
                    { id: 2, text: 'question 2' },
                ]),
            );
            const result = await apolloServer.executeOperation<unknown>(
                {
                    query: '{ questions { id text } }',
                },
                {
                    contextValue: { knex },
                },
            );
            // @ts-ignore: body is a union, should really fix these types
            const data = result?.body?.singleResult?.data;
            expect(data).to.deep.eq({
                questions: [
                    { id: '1', text: 'question 1' },
                    { id: '2', text: 'question 2' },
                ],
            });
        });
    });
});
