import * as dotEnv from "dotenv"
dotEnv.config()
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import Schema from "./gql/schemas/index";
import resolvers from './gql/resolvers';
import context from "./middlewares/context"

// database
import "./database/connection/db"

// routes
import userRoutes from "./express/routes/user.routes"

// create server
const app = express();
const httpServer = http.createServer(app);

// apollo server
const server = new ApolloServer({
  typeDefs: Schema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// Middleware
app.use('/', cors<cors.CorsRequest>(), bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use("/graphql", expressMiddleware(server, { context }));

// routes
app.use('/api/user', userRoutes)

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);