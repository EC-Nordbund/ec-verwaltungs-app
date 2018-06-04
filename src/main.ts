// Using Plugins
import '@/plugins/auth.ts'
import '@/plugins/design/vuetify.ts'
import '@/plugins/design/theme-directives'
import '@/plugins/lib/componentLib.ts'
import '@/plugins/lib_extension/componentLib_extension.ts'
import '@/plugins/qrCode'
import '@/plugins/widgets/index.ts'

// Import Provided Zeug
import apolloProvider from '@/plugins/apollo'
import router from '@/plugins/router/router'

// Import Vue
import Vue from 'vue'
import RouteComponent from '@/plugins/router/routes/router.vue'

// Dev-Electron-Modules
try {eval("if (process && process.env && process.env.NODE_ENV === 'development') {require('module').globalPaths.push(require('path').join(__dirname, '../../../../../../electron/node_modules'))}")} catch (error) {}

// Set Config
Vue.config.productionTip = false

// Create Vue Instance
new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(RouteComponent)
}).$mount('#app')