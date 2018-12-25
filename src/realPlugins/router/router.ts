import routes from '@/realPlugins/router/routes';
import Vue from 'vue';
import Router from 'vue-router';

export default {
  install(vue: typeof Vue) {
    vue.use(Router)
  },
  router: new Router({ routes })
}

require('@/realPlugins/router/routeHandler')
