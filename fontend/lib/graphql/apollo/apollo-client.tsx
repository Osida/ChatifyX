"use client";

import {ApolloClient, InMemoryCache, ApolloProvider, gql} from "@apollo/client";
import {ReactNode} from "react";

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export const ApolloGraphQLProvider = ({children}: { children: ReactNode }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};