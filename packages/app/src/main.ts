import './plugins/vuetify';
import routes from '@/config/routes';
import '@/lib';
import { LesezeichenList } from '@/plugins/lesezeichen';
import themeDirectives from '@/plugins/theme-directives';
import ApolloClient from 'apollo-boost';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import Vue, { CreateElement } from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import {auth} from '@/plugins/auth'

if (require) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'");
  eval("window.fetch = require('node-fetch')");
}

Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(themeDirectives);
Vue.use(LesezeichenList); 
Vue.use(auth)

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: "https://ec-api.de/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (auth.instance) {
      // check if allowed
      next()
    } else {
      next({path: '/login', query:{afterLogIn: to.fullPath}})
    }
  } else {
    next()
  }
  
})

new Vue({
  render: (h: CreateElement) => h("router-view"),
  apolloProvider,
  router,
  el: "#app"
});