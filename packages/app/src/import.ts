import Vue from 'vue';

const contextLib1 = require.context('@/lib', true, /\w+\.lib.vue/);
const contextLib2 = require.context('@/lib', true, /\w+\.lib.ts/);

contextLib1.keys().forEach((key) => {
  const comp = contextLib1(key).default || contextLib1(key);
  Vue.component(comp.name, comp);
});

contextLib2.keys().forEach((key) => {
  const comp = contextLib2(key).default || contextLib2(key);
  Vue.component(comp.name, comp);
});

const contextUtil = require.context('@/util', true, /\w+\.lib.ts/);

contextUtil.keys().forEach((key) => {
  const util = contextUtil(key);
  Vue.prototype.$util[util.name || util.default.name] = util.default || {};
});
 