import '@babel/polyfill';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import VuetifyDialog from 'vuetify-dialog';
import auth from '@/plugins/auth';
import router from '@/router';
import '@/import';
import '@/assets/ecForm.umd.min.js';
import '@/assets/style.css';
import '@/config/form';
import '@/plugins/apollo';
import '@/plugins/notify';
import '@/plugins/telefonFilter';
import '@/plugins/vuetify';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

Vue.use(VuetifyDialog);

Vue.config.productionTip = false;

auth(router, createVue);

Vue.prototype.$empty = () => {};

function createVue() {
  return new Vue({
    router,
    render: (h) => h('router-view')
  }).$mount('#app');
}
