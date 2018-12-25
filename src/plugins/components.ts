import wrapper from '@/plugins/wrapper.vue';
import xButton from '@/plugins/xButton/btn.vue';
import DSGVO from '@/views/DSGVO.vue';
import Vue from 'vue';

Vue.component('ec-x-btn', xButton)
Vue.component('ec-wrapper', wrapper)
Vue.component('ec-dsgvo', DSGVO)
