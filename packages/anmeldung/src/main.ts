import Anmeldung from './Anmeldung.vue';
import Vue from 'vue';

export default (vue: typeof Vue) => {
  vue.component("ec-anmeldung", Anmeldung);
};
