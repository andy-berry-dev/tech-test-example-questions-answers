import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { initApolloServer } from './apollo-server';

export const initExpressApp = async () => {
  const app = express();
  app.use('*', cors());
  app.use(compression());

  const apolloServer = await initApolloServer();
  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), apolloServer);

  return app;
}
