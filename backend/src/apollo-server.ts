import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFile } from 'fs/promises';
import path from 'path';

import { Context, resolvers } from './graphql';

export const initApolloServer = async () => {
    const typeDefs = await readFile(path.resolve(__dirname, './schema.graphql'), { encoding: 'utf-8' });
    const apolloServer = new ApolloServer<Context>({
        typeDefs,
        resolvers,
      });
    await apolloServer.start();
    return expressMiddleware(apolloServer)
}
