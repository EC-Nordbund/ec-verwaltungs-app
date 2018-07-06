import Vue from 'vue';
// Import Components
const geschlechtRadio = () =>
  import(/* webpackChunkName: "lib-extension-radio-geschlecht" */ '@/plugins/lib_extension/radioGroups/geschlecht');
const positionRadio = () =>
  import(/* webpackChunkName: "lib-extension-radio-position" */ '@/plugins/lib_extension/radioGroups/position');
const selectPerson = () =>
  import(/* webpackChunkName: "lib-extension-select-person" */ '@/plugins/lib_extension/selects/personSelect');
const selectAK = () =>
  import(/* webpackChunkName: "lib-extension-select-ak" */ '@/plugins/lib_extension/selects/akSelect');
const selectVerteiler = () =>
  import(/* webpackChunkName: "lib-extension-select-verteiler" */ '@/plugins/lib_extension/selects/verteilerSelect');
const typeRadio = () =>
  import(/* webpackChunkName: "lib-extension-radio-verteiler-type" */ '@/plugins/lib_extension/radioGroups/type');

// Install Components
Vue.component('ec-radio-geschlecht', geschlechtRadio);
Vue.component('ec-radio-position', positionRadio);
Vue.component('ec-radio-type', typeRadio);
Vue.component('ec-select-person', selectPerson);
Vue.component('ec-select-ak', selectAK);
Vue.component('ec-select-verteiler', selectVerteiler);
