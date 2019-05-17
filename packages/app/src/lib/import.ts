import Vue from 'vue';

import wrapper from './wrapper.lib.vue';
import suche from './search.lib.vue';
import editAK from './editAK.form.lib.vue';
import abmelden from './abmelden.form.lib.vue';
import editBemerkungen from './editAnmeldung.Bemerkungen.lib.vue';
import addAK from './addAK.form.lib.vue';
import addPerson from './addPerson.form.lib.vue';
import anmeldungKontakt from './anmeldungKontakt.form.lib.vue'
// import loadData from './loadData.lib.vue';

import addLesezeichen from './lesezeichen/add.lib.vue';
import showLesezeichen from './lesezeichen/show.lib.vue';

Vue.component('ec-wrapper', wrapper);
Vue.component('ec-search', suche);

Vue.component('ec-lesezeichen-add', addLesezeichen);
Vue.component('ec-lesezeichen-show', showLesezeichen);

// Vue.component('ec-loadData', loadData);
Vue.component('ec-add-ak', addAK);
Vue.component('ec-form-edit-ak', editAK);
Vue.component('ec-edit-anmeldung-bemerkungen', editBemerkungen);
Vue.component('ec-abmelden', abmelden);
Vue.component('ec-anmeldung-kontakt', anmeldungKontakt);
Vue.component('ec-add-person', addPerson);