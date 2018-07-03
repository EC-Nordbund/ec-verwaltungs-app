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
import Vue from 'vue'

// dev-Electron-Modules
if (isElectron && !isProduction) {
  eval(
    "require('module').globalPaths.push(require('path').join(__dirname, '../../../../../../electron/node_modules'))"
  )
}
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
