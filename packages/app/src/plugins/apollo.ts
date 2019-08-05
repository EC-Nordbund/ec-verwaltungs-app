import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Vue from 'vue';

Vue.prototype.$gql = gql;
Vue.prototype.$apolloClient = new ApolloClient({
  uri: 'https://api.ec-nordbund.de/graphql'
});
