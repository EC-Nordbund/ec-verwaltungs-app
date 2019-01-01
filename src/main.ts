import extra from '@/plugins';
import auth from '@/plugins/auth';
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

  Vue.config.errorHandler = (
    err: Error,
    vm: Vue,
    info: string
  ) => {
    data.electron.remote.dialog.showErrorBox(
      `Vue-Error - ${err.name}`,
      err.message + '\n' + info
    )
  }

  Vue.config.warnHandler = function(
    msg: string,
    vm,
    trace
  ) {
    data.electron.remote.dialog.showErrorBox(
      'Vue-Warn',
      msg
    )
  }
}

// set Config
Vue.config.productionTip = data.isProduction

// create Vue Instance
new Vue({
  render: h => h('router-view'),
  ...extra()
}).$mount('#app')
