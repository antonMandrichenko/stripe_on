import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import { createConnection } from "typeorm";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });

  await createConnection();

  const app = express();

  app.use(
    session({
      secret: "dgfjdsgWWWbdgdgcvbc",
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
