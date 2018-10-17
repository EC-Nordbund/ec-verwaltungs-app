import apolloProvider from '@/plugins/apollo'
import auth from '@/plugins/auth'
import DSGVO from './views/DSGVO.vue'
import electron, {
  isElectron,
  isProduction
} from '@/plugins/electron'
import lesezeichenShow from '@/plugins/lesezeichen/showLesezeichen.vue'
import lesezeichenToggele from '@/plugins/lesezeichen/addLesezeichen.vue'
import router from '@/plugins/router/router'
import Vue from 'vue'
import wrapper from '@/plugins/wrapper.vue'
import xButton from '@/plugins/xButton/btn.vue'
import '@/plugins/updateChecker'
import '@/plugins/design/vuetify'
import '@/plugins/lib_extension/componentLib_extension'
import '@/plugins/lib/componentLib'
import '@/plugins/qrCode'
import '@/plugins/router/routeHandler'
import '@/plugins/design/theme-directives'
import '@/plugins/auth'
import '@/plugins/widgets'

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
  apolloProvider: apolloProvider(),
  render: h => h('router-view'),
  router
}).$mount('#app')
