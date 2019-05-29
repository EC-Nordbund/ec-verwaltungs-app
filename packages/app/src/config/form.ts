import Vue from 'vue';

const context = require.context('@/config/forms', true, /\w+\.form.ts/);

const obj: any = {};

context.keys().forEach((key) => {
  obj[key.split('/')[1].split('.')[0]] = context(key).default || context(key);
  console.log('Form ' + key.split('/')[1].split('.')[0] + ' installiert.');
});

Vue.prototype.$ecForm = obj;
