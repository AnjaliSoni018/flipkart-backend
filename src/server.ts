import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/schema";
import { context } from "./context";

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(json());

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async (integrationContext) => {
        const { req } = integrationContext;
        return context({ req: req as unknown as import("express").Request });
      },
    }) as unknown as (req: Request, res: Response, next: NextFunction) => void
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
