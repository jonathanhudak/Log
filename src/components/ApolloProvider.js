import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "https://api.jonathanhudak.com/graphql"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token") || null}`
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink)
});

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
