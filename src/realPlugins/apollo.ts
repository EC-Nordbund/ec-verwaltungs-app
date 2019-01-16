import { error } from '@/realPlugins/error';
import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

let client: null | ApolloClient<any> = null

// Create Client
export function getClient() {
  if (client === null) {
    client = new ApolloClient({
      onError: err => {
        if (err.networkError) {
          error(err.networkError)
        }
        if (err.graphQLErrors) {
          err.graphQLErrors.forEach(gqlErr => {
            error(gqlErr)
          })
        }
      },
      uri: 'https://www.ec-api.de/graphql' //Direkter API-Request
      // uri: 'http://ec-api.de:4000/graphql' //Dev API
      // uri: 'https://localhost/graphql'//Locale API
    })
  }
  return client
}

// Create Provider
function getProvider() {
  return new VueApollo({
    defaultClient: getClient()
  })
}
export type IgetApolloClient = () => ApolloClient<any>
export default {
  install(vue: typeof Vue) {
    vue.use(VueApollo)
    vue.prototype.$getApolloClient = getClient
  },
  getProvider
}
