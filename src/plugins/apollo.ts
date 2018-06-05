import Vue from 'vue'
// Ein paar Importe
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { isElectron } from "@/plugins/electron";
// import fetch from 'node-fetch';

// Install Plugin
Vue.use(VueApollo)

if(isElectron) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';")
  eval("window.fetch = require('node-fetch')")
}

// Create Client
export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://h2778646.stratoserver.net:4000/graphql',
    // uri: 'https://localhost:4000/graphql'
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true
}) 

// Create Client
export default new VueApollo({
  defaultClient: client
})

