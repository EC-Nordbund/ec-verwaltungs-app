import extra from '@/plugins';
import auth from '@/plugins/auth';
import '@/plugins/components';
import '@/plugins/lib_extension/componentLib_extension';
import '@/plugins/lib/componentLib';
import '@/plugins/widgets';
import { data } from '@/realPlugins/electron';
import Vue from 'vue';

if (data.isElectron) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';")
  eval("window.fetch = require('node-fetch')")

  //Auto LogOut
  data.electron.remote.powerMonitor.on('suspend', () => {
    auth.logOut(true)
  })
}

// set Config
Vue.config.productionTip = data.isProduction

// create Vue Instance
new Vue({
  render: h => h('router-view'),
  ...extra()
}).$mount('#app')
