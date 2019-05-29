import Vue from 'vue';
import formular from "./formular.vue";
import dialog from './wrapper/wrapperDialog.vue'
import selector from './wrapper/wrap.vue'
import VeeValidate, { Validator } from 'vee-validate';
import de from 'vee-validate/dist/locale/de';
Vue.use(VeeValidate);
Validator.localize('de', de);

const context = require.context('./formElements', true);

Vue.component('formular', formular)
Vue.component('formular-dialog', dialog)
Vue.component('formular-selector', selector)

context.keys().forEach(key => {
  Vue.component('form_' + key.split('/')[1].split('.')[0], context(key).default || context(key));
  console.log("Formelement " + key.split('/')[1].split('.')[0] + " installiert.");
});

Vue.prototype.$ecForm = {}