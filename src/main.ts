import extra from '@/plugins';
import '@/plugins/components';
import '@/plugins/lib_extension/componentLib_extension';
import '@/plugins/lib/componentLib';
import '@/plugins/widgets';
import { data } from '@/realPlugins/electron';
import Vue from 'vue';
// set Config
Vue.config.productionTip = data.isProduction

// create Vue Instance
new Vue({
  render: h => h('router-view'),
  ...extra
}).$mount('#app')
