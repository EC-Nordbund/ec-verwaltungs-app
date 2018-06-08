import Vue from "vue";

// Import Components
const addButton = () => import(/* webpackChunkName: "lib-buttons-add" */"@/plugins/lib/buttons/add.vue");
const iconButton = () => import(/* webpackChunkName: "lib-buttons-icon" */"@/plugins/lib/buttons/icon-btn.vue");
const routerBack = () => import(/* webpackChunkName: "lib-buttons-router-back" */"@/plugins/lib/buttons/router-back.vue");
const datePicker = () => import(/* webpackChunkName: "lib-formElements-input-datePicker" */"@/plugins/lib/formElements/inputs/datePicker.vue");
const checkbox = () => import(/* webpackChunkName: "lib-formElements-input-checkbox" */"@/plugins/lib/formElements/inputs/checkbox.vue");
const radio = () => import(/* webpackChunkName: "lib-formElements-input-radio" */"@/plugins/lib/formElements/inputs/radio.vue");
const switchElement = () => import(/* webpackChunkName: "lib-formElements-input-switch" */"@/plugins/lib/formElements/inputs/switch.vue");
const formDialog = () => import(/* webpackChunkName: "lib-formElements-formDialog" */"@/plugins/lib/formElements/formDialog/form.vue");
const headline = () => import(/* webpackChunkName: "lib-design-headline" */"@/plugins/lib/design/headline.vue");
const table = () => import(/* webpackChunkName: "lib-design-table" */"@/plugins/lib/design/table.vue");
const liste = () => import(/* webpackChunkName: "lib-design-liste" */"@/plugins/lib/design/list.vue");
// const password = () => import(/* webpackChunkName: "lib-password" */'@/plugins/lib/password.vue')
// import selectQuery = () => import('@/plugins/lib/formElements/selects/select.vue'

// Install Components
Vue.component("ec-button-add", addButton);
Vue.component("ec-button-icon", iconButton);
Vue.component("ec-button-router-back", routerBack);
Vue.component("ec-form-datePicker", datePicker);
Vue.component("ec-form-checkbox", checkbox);
Vue.component("ec-form-radio", radio);
Vue.component("ec-form-switch", switchElement);
Vue.component("ec-headline", headline);
Vue.component("ec-table", table);
Vue.component("ec-list", liste);
Vue.component("ec-form", formDialog);
// Vue.component('ec-password', password)

// Vue.component('ec-select-query', selectQuery)
