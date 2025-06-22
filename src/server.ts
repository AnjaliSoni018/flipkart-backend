import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { json } from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import db from "./models";

import { context } from "./context";
import { resolvers, typeDefs } from "./graphql/schema";

console.log("Sequelize initialized:", db.sequelize.getDatabaseName());

db.sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database error", err));


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
