import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

// Install Plugin
Vue.use(VueApollo)

// Create Client
let client: null | ApolloClient<any> = null

export function getClient() {
  if (client === null) {
    client = new ApolloClient({
      link: ApolloLink.from([
        new HttpLink({
          uri: 'https://ec-api.de/graphql' //Direkter API-Request
          // uri: 'http://ec-api.de:4000/graphql' //Dev API
          // uri: 'https://localhost/graphql'//Locale API
        })
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: true
    })
  }
  return client
}

// Create Client
export default () => {
  return new VueApollo({
    defaultClient: getClient()
  })
}
