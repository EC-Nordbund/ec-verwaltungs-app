import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from "apollo-link-error";
import { ApolloLink } from 'apollo-link'


// Install Plugin
Vue.use(VueApollo)

// Create Client
let client: null | ApolloClient<any> = null

export function getClient() {
  if (client === null) {
    client = new ApolloClient({
      link: ApolloLink.from([
        new HttpLink({
          uri:
            'https://h2778646.stratoserver.net:4000/graphql'
          // uri: 'https://localhost:4000/graphql'
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
