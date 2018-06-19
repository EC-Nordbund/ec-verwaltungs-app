import apolloProvider from '@/plugins/apollo'
import '@/plugins/auth.ts'
import '@/plugins/design/theme-directives.ts'
import '@/plugins/design/vuetify.ts'
import {
  isElectron,
  isProduction
} from '@/plugins/electron'
import '@/plugins/lib_extension/componentLib_extension.ts'
import '@/plugins/lib/componentLib.ts'
import '@/plugins/qrCode'
import '@/plugins/router/routeHandler.ts'
import router from '@/plugins/router/router'
import '@/plugins/updateChecker.ts'
import '@/plugins/widgets/index.ts'
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
