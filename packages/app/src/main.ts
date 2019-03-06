import '@babel/polyfill';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VuetifyDialog from 'vuetify-dialog';
import ApolloClient from 'apollo-boost';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/assets/style.css';

import router from '@/router';
// import { Auth } from '@/plugins/auth';

import '@/form';
import '@/plugins/vuetify';
import '@/import';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

// Vue.use(Auth);
Vue.use(VuetifyDialog);

Vue.config.productionTip = false;

Vue.prototype.$authToken = '';

Vue.prototype.$setAuthToken = (authToken: string) => {
  Vue.prototype.$authToken = authToken;
};

Vue.prototype.$apolloClient = new ApolloClient({
  uri: 'https://www.ec-api.de/graphql'
});


new Vue({
  router,
  render: (h) => h('router-view')
}).$mount('#app');
