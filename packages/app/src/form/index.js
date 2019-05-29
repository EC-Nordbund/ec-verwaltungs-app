import Vue from 'vue'

import root from '@/form/root'
import '@/plugins/vuetify'

import VeeValidate, { Validator } from 'vee-validate';
import de from 'vee-validate/dist/locale/de';

Vue.use(VeeValidate);
Validator.localize('de', de);
Vue.component('formular', root)


const context = require.context('@/form/elements', true)

context.keys().forEach((key)=>{
  Vue.component('form_' + key.split('/')[1].split('.')[0], context(key).default || context(key))
  console.log(key)
})