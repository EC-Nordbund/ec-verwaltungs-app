import { routes } from '@/config/routes';
import auth from '@/plugins/auth';
import apolloPlugin from '@/realPlugins/apollo';
import themDirectivesPlugin from '@/realPlugins/design/theme-directives';
import vuetifyPlugin from '@/realPlugins/design/vuetify';
import electronPlugin, { data } from '@/realPlugins/electron';
import errorPlugin from '@/realPlugins/error';
import gqlComponents from '@/realPlugins/gqlComponents/gql';
import lesezeichenPlugin from '@/realPlugins/lesezeichen/lesezeichen';
import '@/realPlugins/qrCode';
import routeHandler from '@/realPlugins/routeHandler';
import updateCheckerPlugin from '@/realPlugins/updateChecker';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
Vue.use(electronPlugin)
Vue.use(updateCheckerPlugin)
Vue.use(apolloPlugin)
Vue.use(errorPlugin)
Vue.use(vuetifyPlugin)
Vue.use(themDirectivesPlugin)
Vue.use(gqlComponents)
Vue.use(lesezeichenPlugin)

export const router = new Router({ routes })

Vue.use(routeHandler, {
  router,
  startPage: '/app',
  loginPage: '/login',
  routesWithOutLogIn: ['/login']
})

export default () => ({
  apolloProvider: apolloPlugin.getProvider(),
  router: router
})

if (data.isElectron) {
  data.electron.ipcRenderer.on(
    'proto-set-route',
    (e: any, url: string) => {
      if (auth.isLogedIn()) {
        router.push(url)
      } else {
        auth.protoUrl(url)
      }
    }
  )
}
