import Vue from 'vue';
// import { pascalToBindestrich } from '@/util/caseConverter';

// const contextLib1 = require.context('@/lib', true, /\w+\.lib.vue/);
// const contextLib2 = require.context('@/lib', true, /\w+\.lib.ts/);

// contextLib1.keys().forEach((key) => {
//   const comp = contextLib1(key).default || contextLib1(key);
//   Vue.component(pascalToBindestrich(comp.name), comp);
// });

// contextLib2.keys().forEach((key) => {
//   const comp = contextLib2(key).default || contextLib2(key);
//   Vue.component(pascalToBindestrich(comp.name), comp);
// });

import './lib/import';

const contextUtil = require.context('@/util', true, /\w+\.util.ts/);

const tmpUtil: any = {};

contextUtil.keys().forEach((key) => {
  const util = contextUtil(key);
  tmpUtil[util.name || util.default.name] = util.default || {};
});

Vue.prototype.$util = tmpUtil;
