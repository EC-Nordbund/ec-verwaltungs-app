import Vue from 'vue';
import formular from './formular.vue';
import dialog from './wrapper/wrapperDialog.vue';
import anmeldung from './wrapper/anmeldung.vue';
import selector from './wrapper/wrap.vue';
import VeeValidate, { Validator } from 'vee-validate';
// @ts-ignore
import de from 'vee-validate/dist/locale/de';
import 'vuetify/src/stylus/app.styl';
Vue.use(VeeValidate);
Validator.localize('de', de);

Validator.extend('has_upper', {
  validate: (value: string) => value.match(/[A-Z]/g) !== null,
  getMessage: () => 'Enthält keine Großbuchstaben'
});

Validator.extend('has_lower', {
  validate: (value: string) => value.match(/[a-z]/g) !== null,
  getMessage: () => 'Enthält keine Kleinbuchstaben'
});

Validator.extend('has_digit', {
  validate: (value: string) => value.match(/[0-9]/g) !== null,
  getMessage: () => 'Enthält keine Ziffer'
});

Validator.extend('has_special', {
  validate: (value: string) => value.match(/[!@#\$%\^\&*+=._\-?]/g) !== null,
  getMessage: () => 'Enthält kein Sonderzeichen (!@#$^&*+=._-?)'
});

const context = require.context('./formElements', true);

Vue.component('formular', formular);
Vue.component('formular-dialog', dialog);
Vue.component('ec-form-anmeldung', anmeldung);
Vue.component('formular-selector', selector);

let a:any= {}

context.keys().forEach((key) => {
  Vue.component('form_' + key.split('/')[1].split('.')[0], context(key).default || context(key));
  a[key.split('/')[1].split('.')[0]] = true;
});

console.log(Object.keys(a));

Vue.prototype.$ecForm = {};
