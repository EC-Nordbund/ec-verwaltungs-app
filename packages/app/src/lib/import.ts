import Vue from 'vue';

import editAK from './editAK.form.lib.vue';
import anmeldungKontakt from './anmeldungKontakt.form.lib.vue';
import mergeAdresse from './adresseMerge.form.lib.vue';

import wrapper from './wrapper.lib.vue'
import search from './search.lib.vue'
import add from './lesezeichen.add.lib.vue'
import show from './lesezeichen.show.lib.vue'

Vue.component('ec-wrapper', wrapper);
Vue.component('ec-search', search);
Vue.component('ec-lesezeichen-add', add);
Vue.component('ec-lesezeichen-show', show);

Vue.component('ec-form-edit-ak', editAK);
Vue.component('ec-anmeldung-kontakt', anmeldungKontakt);
Vue.component('ec-adresse-merge', mergeAdresse);
