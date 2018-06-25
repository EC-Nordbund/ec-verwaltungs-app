import * as electron from 'electron'
const _isElectron = (window as any).require !== undefined

const el: typeof electron = _isElectron
  ? eval('require("electron")')
  : null

const _prod: boolean = _isElectron
  ? process.env.NODE_ENV !== 'development'
  : true

/**
 * Gibt an ob in Electron
 */
export const isElectron = _isElectron
/**
 *  Gibt an ob in Produktion-Mode
 */
export const isProduction = _prod
/**
 * Electron API or Null
 */
export default el
