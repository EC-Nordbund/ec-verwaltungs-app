import DSGVO from './views/DSGVO.vue';
import ecGQLmutate from '@/gql/ecGQLmutate.vue';
import ecGQLquery from '@/gql/ecGQLquery.vue';
import ecGQLwatch from '@/gql/ecGQLwatch.vue';
import extra from '@/plugins';
import '@/plugins/auth';
import auth from '@/plugins/auth';
import '@/plugins/design/theme-directives';
import '@/plugins/design/vuetify';
import electron, { isElectron, isProduction } from '@/plugins/electron';
import lesezeichenToggele from '@/plugins/lesezeichen/addLesezeichen.vue';
import lesezeichenShow from '@/plugins/lesezeichen/showLesezeichen.vue';
import '@/plugins/lib_extension/componentLib_extension';
import '@/plugins/lib/componentLib';
import '@/plugins/qrCode';
import '@/plugins/router/routeHandler';
import router from '@/plugins/router/router';
import '@/plugins/widgets';
import wrapper from '@/plugins/wrapper.vue';
import xButton from '@/plugins/xButton/btn.vue';
import Vue from 'vue';
Vue.component('gql-query', ecGQLquery)
Vue.component('gql-watch', ecGQLwatch)
Vue.component('gql-mutate', ecGQLmutate)
Vue.component('ec-lesezeichen-add', lesezeichenToggele)
Vue.component('ec-lesezeichen-show', lesezeichenShow)
Vue.component('ec-x-btn', xButton)
Vue.component('ec-wrapper', wrapper)
Vue.component('ec-dsgvo', DSGVO)

if (isElectron) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';")
  eval("window.fetch = require('node-fetch')")
  electron.ipcRenderer.on(
    'proto-set-route',
    (e: any, url: string) => {
      if (auth.isLogedIn()) {
        router.push(url)
      } else {
        auth.protoUrl(url)
      }
    }
  )

  //Auto LogOut
  electron.remote.powerMonitor.on('suspend', () => {
    auth.logOut(true)
  })
}

// set Config
Vue.config.productionTip = isProduction

// create Vue Instance
new Vue({
  render: h => h('router-view'),
  router,
  ...extra
}).$mount('#app')
