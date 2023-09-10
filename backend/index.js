import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./lib/graphql/schemas/index.js";
import resolvers from "./lib/graphql/resolvers/index.js";
import {makeExecutableSchema} from "@graphql-tools/schema";

const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({
    schema,

});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const {url} = await startStandaloneServer(server, {
    listen: {port: 4000, path: "/graphql"},
});

console.log(`🚀  Server ready at: ${url}`);