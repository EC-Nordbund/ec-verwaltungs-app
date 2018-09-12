import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
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
          uri: 'https://ec-api.de/graphql' //Direkter API-Request
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
