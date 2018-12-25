import auth from '@/plugins/auth';
import apolloPlugin from '@/realPlugins/apollo';
import themDirectivesPlugin from '@/realPlugins/design/theme-directives';
import vuetifyPlugin from '@/realPlugins/design/vuetify';
import electronPlugin, { data } from '@/realPlugins/electron';
import errorPlugin from '@/realPlugins/error';
import '@/realPlugins/qrCode';
import routerPlugin from '@/realPlugins/router/router';
import updateCheckerPlugin from '@/realPlugins/updateChecker';
import Vue from 'vue';

Vue.use(electronPlugin)
Vue.use(updateCheckerPlugin)
Vue.use(apolloPlugin)
Vue.use(errorPlugin)
Vue.use(vuetifyPlugin)
Vue.use(themDirectivesPlugin)
Vue.use(routerPlugin)

export default () => ({
  apolloProvider: apolloPlugin.getProvider(),
  router: routerPlugin.router
})

if (data.isElectron) {
  data.electron.ipcRenderer.on(
    'proto-set-route',
    (e: any, url: string) => {
      if (auth.isLogedIn()) {
        routerPlugin.router.push(url)
      } else {
        auth.protoUrl(url)
      }
    }
  )
}


