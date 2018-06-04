import Vue from 'vue'
// Ein paar Importe
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import fetch from 'node-fetch';

// Install Plugin
Vue.use(VueApollo)

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Create Client
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://h2778646.stratoserver.net:4000/graphql',
    // fetch: require('A:/ec-git/ec-verwaltungs-app/node_modules/node-fetch')
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true
}) 

// Create Client
export default new VueApollo({
  defaultClient: client
})

