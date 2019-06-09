import Vue from 'vue';

import editAK from './editAK.form.lib.vue';
import anmeldungKontakt from './anmeldungKontakt.form.lib.vue';
import mergeAdresse from './adresseMerge.form.lib.vue';

Vue.component('ec-wrapper', () => import('./wrapper.lib.vue'));
Vue.component('ec-search', () => import('./search.lib.vue'));
Vue.component('ec-lesezeichen-add', () => import('./lesezeichen.add.lib.vue'));
Vue.component('ec-lesezeichen-show', () => import('./lesezeichen.show.lib.vue'));

Vue.component('ec-form-edit-ak', editAK);
Vue.component('ec-anmeldung-kontakt', anmeldungKontakt);
Vue.component('ec-adresse-merge', mergeAdresse);
