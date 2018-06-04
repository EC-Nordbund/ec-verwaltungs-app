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
import Main from './Main.vue'

// require('module').globalPaths.push('A:/ec-git/ec-verwaltungs-app/node_modules')

// Set Config
Vue.config.productionTip = false

// Create Vue Instance
new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(Main)
}).$mount('#app')


console.log(require('electron'))