import * as _electron from 'electron';
import * as _fs from 'fs';
export const isElectron =
  (window as any).require !== undefined

export const electron: typeof _electron = isElectron
  ? eval('require("electron")')
  : null

export const isProduction: boolean = isElectron
  ? process.env.NODE_ENV !== 'development'
  : true

export const fs: typeof _fs = isElectron
  ? eval('require("fs")')
  : null

export default electron
