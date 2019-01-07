import plugins from '@/plugins';
import Vue, { CreateElement } from 'vue';

if (require) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'");
  eval("window.fetch = require('node-fetch')");
}

Vue.use(plugins)

Vue.config.productionTip = false;

new Vue({
  render: (h: CreateElement) => h("router-view"),
  ...plugins.getOptions(),
  el: "#app"
});