import '@babel/polyfill';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VuetifyDialog from 'vuetify-dialog';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import '@/assets/style.css';
import * as save from 'js-cookie';

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

Vue.filter('telefon', function (value:string) {
  let numOnly = value.replace(/\D/g,'');
  let ret = '';
  let found = false;
  let find = (<any>window).$vorwahlen;
  if (numOnly.substr(0, 4)=='0049') {
    numOnly = '0' + numOnly.substr(4);
  }
  if (numOnly.substr(0, 2)=='00') {
    return numOnly;
  } else {
    numOnly.split('').forEach((c, id)=>{
      if (id===0) {
        ret = ret + c;
        return;
      }
      if (!found) {
        find = find[c];
        if (find===undefined) {
          found = true;
          ret = ret + ' ';
        }
      }
      ret = ret + c;
    })

    return ret;
  }
})

// Vue.use(Auth);
Vue.use(VuetifyDialog);

Vue.config.productionTip = false;

if (Notification.permission !== 'denied') {
  Notification.requestPermission();
}

Vue.prototype.$notifikation = (title: string, body: string) => {
  return new Notification(title, {body, icon: '/img/ec-logo-512.361ca3c3.png'});
};

let auth = {
  authToken: '',
  logout: new Date()
}

Vue.prototype.$authToken = ()=>{
  auth.logout = new Date();
  return auth.authToken;
};

Vue.prototype.$gql = gql;

Vue.prototype.$setAuthToken = (authToken: string) => {
  auth.logout = new Date();
  auth.authToken = authToken;
};

Vue.prototype.$apolloClient = new ApolloClient({
  uri: 'https://ec-api.de/graphql'
});


new Vue({
  router,
  render: (h) => h('router-view')
}).$mount('#app');
