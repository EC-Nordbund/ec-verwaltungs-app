import Vue from 'vue';

import editAK from './editAK.form.lib.vue';
import anmeldungKontakt from './anmeldungKontakt.form.lib.vue';
import fzAntrag from './fzAntrag.form.lib.vue';
import fz from './fz.form.lib.vue';
import mergeAdresse from './adresseMerge.form.lib.vue';
import mergePerson from './mergePerson.form.lib.vue';

Vue.component('ec-wrapper', () => import('./wrapper.lib.vue'));
Vue.component('ec-search', () => import('./search.lib.vue'));
Vue.component('ec-lesezeichen-add', () => import('./lesezeichen/add.lib.vue'));
Vue.component('ec-lesezeichen-show', () => import('./lesezeichen/show.lib.vue'));

Vue.component('ec-form-edit-ak', editAK);
Vue.component('ec-anmeldung-kontakt', anmeldungKontakt);
Vue.component('ec-fz-antrag', fzAntrag);
Vue.component('ec-fz', fz);
Vue.component('ec-adresse-merge', mergeAdresse);
Vue.component('ec-person-merge', mergePerson);
