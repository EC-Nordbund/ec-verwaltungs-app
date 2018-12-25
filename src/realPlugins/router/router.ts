import routes from '@/realPlugins/router/routes';
import Vue from 'vue';
import Router from 'vue-router';

export default {
  install(vue: typeof Vue) {
    Router.install(vue)
  },
  router: new Router({ routes })
}