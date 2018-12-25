import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

let client: null | ApolloClient<any> = null

// Create Client
export function getClient() {
  if (client === null) {
    client = new ApolloClient({
      uri: 'https://ec-api.de/graphql' //Direkter API-Request
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
    VueApollo.install(vue)
    vue.prototype.$getApolloClient = getClient
  },
  getProvider
}