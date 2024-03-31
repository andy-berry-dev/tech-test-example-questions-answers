import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Knex } from 'knex';

import { Context, typeDefs, resolvers } from './graphql';

export const initApolloServer = async ({ knex }: { knex: Knex }) => {
    const apolloServer = new ApolloServer<Context>({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();
    return expressMiddleware(apolloServer, {
        context: async () => ({
            knex,
        }),
    });
};
