import '@babel/polyfill';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VuetifyDialog from 'vuetify-dialog';
import Vuetify from 'vuetify';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/assets/style.css';

import router from '@/router';
import { Auth } from '@/plugins/auth';
import vuetifyOpts from '@/plugins/vuetify';

import '@/form';
import '@/import';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

Vue.use(Auth);
Vue.use(VuetifyDialog);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify: new Vuetify(vuetifyOpts),
  render: (h) => h('router-view')
}).$mount('#app');
