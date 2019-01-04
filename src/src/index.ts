import { routes } from './routes';
import Vue from 'vue';
import Router from 'vue-router';

let router: Router | null = null;

export default {
  install(vue: typeof Vue) {
    vue.use(Router);

    router = new Router({
      routes
    });
  },

  getRouter() {
    return router;
  }
};
