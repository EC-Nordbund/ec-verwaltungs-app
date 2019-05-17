export const name = 'lesezeichen';

import * as save from 'js-cookie';

import Vue from 'vue'

let lesezeichen:{[path:string]: {title: string, subTitle: string, fullPath: string}} = Vue.observable({})// (<any>JSON.parse(<any>save.get('lesezeichen')) || {};

let listeners:{[name:string]:()=>void} = {}

export default {
  remove(path: string) {
    Vue.delete(lesezeichen, path)
    // delete lesezeichen[path];
    handler()
  },
  add(title: string, subTitle: string, fullPath: string, path: string) {
    Vue.set(lesezeichen, path, {
      title,
      subTitle,
      fullPath
    })
    handler()
  },
  check(path: string):boolean {
    return !!lesezeichen[path]
  },
  // getListe() {
  //   return lesezeichen
  // },
  lesezeichen,

  addListener(name:string, cb: ()=>void) {
    listeners[name] = cb;
  },
  removeListener(name:string) {
    delete listeners[name];
  }
};


function handler() {
  // save.remove('lesezeichen')
  // save.set('lesezeichen', JSON.stringify(lesezeichen))
  for (const key in listeners) {
    if (listeners.hasOwnProperty(key)) {
      listeners[key]();
    }
  }
}