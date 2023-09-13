"use client";
import {ReactNode} from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

/**
 * Apollo Client instance for communicating with the GraphQL server.
 * @type {ApolloClient}
 * @property {string} uri - The URI of the GraphQL server.
 * @property {string} credentials - Policy for sending credentials (cookies, headers) with requests. Set to 'include' to always include credentials.
 * @property {InMemoryCache} cache - The cache implementation to use for caching query results.
 */
export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

/**
 * Apollo Provider component. Wraps the application and provides the Apollo Client instance via context.
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to render within the provider.
 * @returns {ReactElement} The ApolloProvider component with the client instance and child components.
 */
export const ApolloGraphQLProvider = ({children}: { children: ReactNode }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};
