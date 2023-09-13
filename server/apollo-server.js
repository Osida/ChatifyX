import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {config} from "dotenv";
import fetch from "node-fetch";
import {ApolloServer} from "@apollo/server";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {WebSocketServer} from "ws";
import {useServer} from "graphql-ws/lib/use/ws";
import typeDefs from "./graphql/schemas/index.js";
import resolvers from "./graphql/resolvers/index.js";

// Load environment variables from .env file
config();

// Create a GraphQL schema using type definitions and resolvers
const schema = makeExecutableSchema({typeDefs, resolvers});

// Initialize an Express application
const app = express();

// Create an HTTP server for handling incoming requests
const httpServer = http.createServer(app);

/**
 * WebSocket server instance for handling GraphQL subscriptions.
 * @type {WebSocketServer}
 */
const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
});

// Save the returned server's info, so we can shut down this server later
const serverCleanup = useServer({schema}, wsServer);

/**
 * Apollo Server instance with plugins for proper shutdown of HTTP and WebSocket servers.
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();

/**
 * Fetches the session data from the NextAuth.js session endpoint.
 *
 * @param {object} req - The request object.
 * @returns {Promise<object>} The session data.
 */
async function fetchSession(req) {
    const {cookie} = req.headers;
    const sessionUrl = `${process.env.NEXTAUTH_URL}/api/auth/session`;
    const response = await fetch(sessionUrl, {
        headers: {
            cookie,
        },
    });
    return await response.json();
}

/**
 * Middleware for handling CORS, parsing JSON, and handling GraphQL requests.
 */
app.use(
    "/",
    cors({
        origin: ({origin: ["http://localhost:3000", "http://localhost:4000"]}),
        credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({req}) => {
            const session = await fetchSession(req);
            return {
                session,
            };
        },
    }),
);

// Start the HTTP server
httpServer.listen(process.env.SERVER_PORT || 4000, () => {
    console.log(`🚀 Server is now running on http://localhost:${process.env.SERVER_PORT}/graphql`);
});
