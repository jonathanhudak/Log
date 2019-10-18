import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://api.jonathanhudak.com/graphql"
});

const TOKEN_KEY = "token";

const client = new ApolloClient({
  cache,
  link,
  headers: {
    authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`
  }
});

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
