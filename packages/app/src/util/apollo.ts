import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import Vue from "vue";
import VueApollo from "vue-apollo";

let _authtoken = "";

export const name = "apollo";

const utilFunc = (vue: typeof Vue) => {
  vue.use(VueApollo);
  const httpLink = createHttpLink({
    // uri: "https://ec-api.de/graphql"
    uri: "http://localhost:31415/graphql"
  });

  const authLink = setContext((_, { headers }) => {
    console.log(_authtoken)
    return {
      headers: {
        ...headers,
        _authtoken
      }
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  });

  return {
    apolloClient,
    apolloProvider
  };
};

utilFunc.setAuthToken = (authToken: string) => {
  console.log(_authtoken)
  _authtoken = authToken;
};

export default utilFunc;
