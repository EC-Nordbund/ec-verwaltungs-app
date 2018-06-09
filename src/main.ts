import {
  isElectron,
  isProduction
} from '@/plugins/electron';

// dev-Electron-Modules
if (isElectron && !isProduction) {
  eval(
    "require('module').globalPaths.push(require('path').join(__dirname, '../../../../../../electron/node_modules'))"
  );
}
if (isElectron) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';");
  eval("window.fetch = require('node-fetch')");
}

// using Plugins
import '@/plugins/auth.ts';
import '@/plugins/design/theme-directives.ts';
import '@/plugins/design/vuetify.ts';
import '@/plugins/lib/componentLib.ts';
import '@/plugins/lib_extension/componentLib_extension.ts';
import '@/plugins/qrCode';
import '@/plugins/router/routeHandler.ts';
import '@/plugins/updateChecker.ts';
import '@/plugins/widgets/index.ts';

// import Provided Zeug
import apolloProvider from '@/plugins/apollo';
import router from '@/plugins/router/router';

// import Vue
import Vue from 'vue';
// set Config
Vue.config.productionTip = isProduction;

// create Vue Instance
new Vue({
  provide: apolloProvider().provide(),
  render: h => h('router-view'),
  router
}).$mount('#app');
