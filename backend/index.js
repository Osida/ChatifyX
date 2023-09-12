import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./lib/graphql/schemas/index.js";
import resolvers from "./lib/graphql/resolvers/index.js";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {getSession} from "next-auth/react";
import {GraphQLError} from "graphql";

/**
 * Create an executable schema using type definitions and resolvers
 * @type {GraphQLSchema}
 */
const schema = makeExecutableSchema({typeDefs, resolvers});

/**
 * Initialize a new Apollo Server with the created schema
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    schema,
});

/**
 * Start the standalone server with specified options
 * Passing an ApolloServer instance to the `startStandaloneServer` function:
 *  1. creates an Express app
 *  2. installs your ApolloServer instance as middleware
 *  3. prepares your app to handle incoming requests
 * @type {Promise<{url: string}>}
 */
const {url} = await startStandaloneServer(server, {
    listen: {port: process.env.PORT || 4000, path: process.env.PATH || "/graphql"},
});

console.log(`🚀  Server ready at: ${url}`);