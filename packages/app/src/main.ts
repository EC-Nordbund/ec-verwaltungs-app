import plugins from '@/plugins';
import * as Sentry from '@sentry/browser';
import Vue, { CreateElement } from 'vue';

Sentry.init({
  dsn: "https://b3b34064975846faa3a6757b52ea2168@sentry.io/1367817",
  integrations: [new Sentry.Integrations.Vue({Vue})]
});

if (require) {
  eval("process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'");
  eval("window.fetch = require('node-fetch')");
}

Vue.use(plugins);

Vue.config.productionTip = false;

new Vue({
  render: (h: CreateElement) => h("router-view"),
  ...plugins.getOptions(),
  el: "#app"
});
