import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { initApolloServer } from './apollo-server';
import { initDb } from './knex';

export const initExpressApp = async () => {
    const app = express();
    app.use('*', cors());
    app.use(compression());

    const knex = await initDb();

    const apolloServer = await initApolloServer({ knex });
    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), apolloServer);

    return app;
};
