import ecGQLmutate from '@/gql/ecGQLmutate.vue';
import ecGQLquery from '@/gql/ecGQLquery.vue';
import ecGQLwatch from '@/gql/ecGQLwatch.vue';
import lesezeichenToggele from '@/plugins/lesezeichen/addLesezeichen.vue';
import lesezeichenShow from '@/plugins/lesezeichen/showLesezeichen.vue';
import wrapper from '@/plugins/wrapper.vue';
import xButton from '@/plugins/xButton/btn.vue';
import DSGVO from '@/views/DSGVO.vue';
import Vue from 'vue';
Vue.component('gql-query', ecGQLquery)
Vue.component('gql-watch', ecGQLwatch)
Vue.component('gql-mutate', ecGQLmutate)
Vue.component('ec-lesezeichen-add', lesezeichenToggele)
Vue.component('ec-lesezeichen-show', lesezeichenShow)
Vue.component('ec-x-btn', xButton)
Vue.component('ec-wrapper', wrapper)
Vue.component('ec-dsgvo', DSGVO)
