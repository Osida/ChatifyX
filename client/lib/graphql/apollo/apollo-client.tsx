"use client";
import {ReactNode} from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

export const ApolloGraphQLProvider = ({children}: { children: ReactNode }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};