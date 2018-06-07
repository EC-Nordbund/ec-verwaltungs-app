// using Plugins
import "@/plugins/auth.ts";
import "@/plugins/design/vuetify.ts";
import "@/plugins/design/theme-directives";
import "@/plugins/lib/componentLib.ts";
import "@/plugins/lib_extension/componentLib_extension.ts";
import "@/plugins/qrCode";
import "@/plugins/widgets/index.ts";
import "@/plugins/updateChecker"

// dev-Electron-Modules
try { eval(`if (process && process.env && process.env.NODE_ENV === 'development') {require('module').globalPaths.push(require('path').join(__dirname, '../../../../../../electron/node_modules'))}`) } catch (error) { }

// import Provided Zeug
import apolloProvider from "@/plugins/apollo";
import router from "@/plugins/router/router";

import "@/plugins/router/routeHandler.ts";

// import Vue
import Vue from "vue";
import RouteComponent from "@/plugins/router/routes/router.vue";
import { isProduction } from "@/plugins/electron";

// set Config
Vue.config.productionTip = isProduction;

// create Vue Instance
new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(RouteComponent)
}).$mount("#app");