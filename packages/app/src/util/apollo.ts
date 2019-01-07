import Vue from "vue";
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

export const name = "apollo"

export default (vue:typeof Vue)=>{
  vue.use(VueApollo);
  const apolloClient = new ApolloClient({
    // You should use an absolute URL here
    uri: "https://ec-api.de/graphql"
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  });

  return {
    apolloClient,
    apolloProvider
  }
}