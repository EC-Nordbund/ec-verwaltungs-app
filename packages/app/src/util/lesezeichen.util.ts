export const name = 'lesezeichen';

import * as save from 'js-cookie';

import Vue from 'vue';

const lesezeichen: {[path: string]: {title: string, subTitle: string, fullPath: string}} =
  Vue.observable(JSON.parse(save.get('lesezeichen') || '{}'));

export default {
  remove(path: string) {
    Vue.delete(lesezeichen, path);
    save.set('lesezeichen', JSON.stringify(lesezeichen));
  },
  add(title: string, subTitle: string, fullPath: string, path: string) {
    Vue.set(lesezeichen, path, {
      title,
      subTitle,
      fullPath
    });
    save.set('lesezeichen', JSON.stringify(lesezeichen));
  },
  check(path: string): boolean {
    return !!lesezeichen[path];
  },
  lesezeichen
};
