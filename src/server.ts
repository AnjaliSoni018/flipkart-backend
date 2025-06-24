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
import { initAdmin } from "./utils/initadmin";

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  try {
    console.log("Sequelize initialized:", db.sequelize.getDatabaseName());

    await db.sequelize.authenticate();
    console.log("Database connected");

    await initAdmin();

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const server = new ApolloServer({ schema });
    await server.start();

    app.use(cors());
    app.use(json());

    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async (integrationContext) => {
          const { req } = integrationContext;
          return context({ req: req as unknown as Request });
        },
      }) as unknown as (req: Request, res: Response, next: NextFunction) => void
    );

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();
