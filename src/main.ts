import apolloProvider from '@/plugins/apollo'
import '@/plugins/auth'
import '@/plugins/design/theme-directives'
import '@/plugins/design/vuetify'
import {
  isElectron,
  isProduction
} from '@/plugins/electron'
import '@/plugins/lib_extension/componentLib_extension'
import '@/plugins/lib/componentLib'
import '@/plugins/qrCode'
import '@/plugins/router/routeHandler'
import router from '@/plugins/router/router'
import '@/plugins/updateChecker'
import '@/plugins/widgets'
import lesezeichenToggele from '@/plugins/lesezeichen/addLesezeichen.vue'
import lesezeichenShow from '@/plugins/lesezeichen/showLesezeichen.vue'
import xButton from '@/plugins/xButton/btn.vue'
import Vue from 'vue'

Vue.component('ec-lesezeichen-add', lesezeichenToggele)
Vue.component('ec-lesezeichen-show', lesezeichenShow)
Vue.component('ec-x-btn', xButton)

if (isElectron) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';")
  eval("window.fetch = require('node-fetch')")
}

// set Config
Vue.config.productionTip = isProduction

// create Vue Instance
new Vue({
  provide: apolloProvider().provide(),
  render: h => h('router-view'),
  router
}).$mount('#app')
