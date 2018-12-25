import * as _electron from 'electron';
import * as _settings from 'electron-settings';
import * as _fs from 'fs';
import * as _os from 'os';
import Vue from 'vue';

const { config } = require('../../electron/package.json')
const version = require('../../package.json').version
const isElectron = (window as any).require !== undefined
const isProduction: boolean = isElectron
  ? process.env.NODE_ENV !== 'development'
  : true

export interface Irequire {
  isElectron: boolean
  isProduction: boolean
  electron: typeof _electron
  fs: typeof _fs
  os: typeof _os
  version: string
  isPrerelease: boolean
  settings: typeof _settings
}

export let data: Irequire

if (isElectron) {
  data = {
    isElectron,
    isProduction,
    electron: (window as any).require('electron'),
    fs: (window as any).require('fs'),
    os: (window as any).require('os'),
    settings: (window as any).require('electron-settings'),
    version,
    isPrerelease: config.forge.publishers[0].prerelease
  }
} else {
  data = <any>{
    isElectron,
    isProduction,
    electron: null,
    fs: null,
    os: null,
    settings: null,
    version,
    isPrerelease: config.forge.publishers[0].prerelease
  }
}

export default {
  install(vue: typeof Vue) {
    vue.prototype.$require = data
  }
}
