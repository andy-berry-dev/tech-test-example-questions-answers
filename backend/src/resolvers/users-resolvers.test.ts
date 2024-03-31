import Knex from 'knex';
import mockKnex from 'mock-knex';
import { ApolloServer } from '@apollo/server';
import { expect } from 'chai';

import { Context, typeDefs, resolvers } from '../graphql';

const db = mockKnex.getTracker();

describe('Users resolvers => Query', () => {
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

    describe('users', () => {
        it('returns the list of users from the DB', async () => {
            db.on('query', (query) =>
                query.response([
                    { id: 1, name: 'user 1' },
                    { id: 2, name: 'user 2' },
                ]),
            );
            const result = await apolloServer.executeOperation<unknown>(
                {
                    query: '{ users { id name } }',
                },
                {
                    contextValue: { knex },
                },
            );
            // @ts-ignore: body is a union, should really fix these types
            const data = result?.body?.singleResult?.data;
            expect(data).to.deep.eq({
                users: [
                    { id: '1', name: 'user 1' },
                    { id: '2', name: 'user 2' },
                ],
            });
        });
    });
});
