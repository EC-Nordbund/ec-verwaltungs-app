import Vue from 'vue';
// Import Components
const geschlechtRadio = () =>
  import(/* webpackChunkName: "lib-extension-radio-geschlecht" */ '@/plugins/lib_extension/radioGroups/geschlecht.ts');
const positionRadio = () =>
  import(/* webpackChunkName: "lib-extension-radio-position" */ '@/plugins/lib_extension/radioGroups/position.ts');
const selectPerson = () =>
  import(/* webpackChunkName: "lib-extension-select-person" */ '@/plugins/lib_extension/selects/personSelect.ts');
const selectAK = () =>
  import(/* webpackChunkName: "lib-extension-select-ak" */ '@/plugins/lib_extension/selects/akSelect.ts');
const selectVerteiler = () =>
  import(/* webpackChunkName: "lib-extension-select-verteiler" */ '@/plugins/lib_extension/selects/verteilerSelect.ts');
const typeRadio = () =>
  import(/* webpackChunkName: "lib-extension-radio-verteiler-type" */ '@/plugins/lib_extension/radioGroups/type.ts');

// Install Components
Vue.component('ec-radio-geschlecht', geschlechtRadio);
Vue.component('ec-radio-position', positionRadio);
Vue.component('ec-radio-type', typeRadio);
Vue.component('ec-select-person', selectPerson);
Vue.component('ec-select-ak', selectAK);
Vue.component('ec-select-verteiler', selectVerteiler);
