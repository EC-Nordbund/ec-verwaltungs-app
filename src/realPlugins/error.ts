import { data } from '@/realPlugins/electron';
import Vue from 'vue';
const { electron } = data

export default {
  install(vue: typeof Vue) {
    vue.prototype.$error = error
  }
}

export function error(err: Error) {
  if (electron) {
    electron.remote.dialog.showErrorBox(
      err.name || 'Error',
      'Ein Fehler ist Aufgetreten\n' + err.message
    )
  } else {
    alert(
      `${err.name}\nEin Fehler ist Aufgetreten\n${
        err.message
      }`
    )
  }
}
