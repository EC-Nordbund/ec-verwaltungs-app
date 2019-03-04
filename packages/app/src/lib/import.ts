import Vue from 'vue';

import wrapper from './wrapper.lib.vue';
import suche from './search.lib.vue';

import addLesezeichen from './lesezeichen/add.lib.vue';
import showLesezeichen from './lesezeichen/show.lib.vue';

Vue.component('ec-wrapper', wrapper);
Vue.component('ec-search', suche);

Vue.component('ec-lesezeichen-add', addLesezeichen);
Vue.component('ec-lesezeichen-show', showLesezeichen);
