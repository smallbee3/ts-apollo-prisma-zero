import { ApolloServer } from 'apollo-server-express';
import { createContext } from './context';
import { createServer } from 'http';
import express from 'express';
import { schema } from './schema';

const { PORT = 5000 } = process.env;

const app = express();
const server = createServer(app);
// const apollo = new ApolloServer({ typeDefs, resolvers });
const apollo = new ApolloServer({
  schema,
  context: createContext,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
});
apollo.applyMiddleware({ app });

server.listen({ port: PORT }, () => {
  process.stdout.write(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
  ); 
});
