import { routes } from '@/config/routes';
import auth from '@/plugins/auth';
import apolloPlugin from '@/realPlugins/apollo';
import themDirectivesPlugin from '@/realPlugins/design/theme-directives';
import vuetifyPlugin from '@/realPlugins/design/vuetify';
import electronPlugin, { data } from '@/realPlugins/electron';
import errorPlugin from '@/realPlugins/error';
import formConfigPlugin from '@/realPlugins/formConfig';
import gqlComponents from '@/realPlugins/gqlComponents/gql';
import { LesezeichenList } from '@/realPlugins/lesezeichen/neueLesezeichen';
import libPlugin from '@/realPlugins/lib/componentLib';
import '@/realPlugins/qrCode';
import routeHandler from '@/realPlugins/routeHandler';
import updateCheckerPlugin from '@/realPlugins/updateChecker';
import { xButton as xButtonPlugin } from '@/realPlugins/xButton/logic';
import xButtonNew from '@/realPlugins/xButtonNew';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(formConfigPlugin)
Vue.use(Router)
Vue.use(electronPlugin)
Vue.use(updateCheckerPlugin)
Vue.use(apolloPlugin)
Vue.use(errorPlugin)
Vue.use(vuetifyPlugin)
Vue.use(themDirectivesPlugin)
Vue.use(gqlComponents)
Vue.use(LesezeichenList)
Vue.use(xButtonPlugin)
Vue.use(libPlugin)

Vue.component('x-btn-new', xButtonNew)

export const router = new Router({
  routes,
  mode: data.isElectron ? 'hash' : 'history'
})

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
