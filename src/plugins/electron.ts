import * as electron from 'electron'
const _isElectron = (<any>window).require !== undefined

const el: typeof electron = _isElectron?eval('require("electron")'):null

/**
 * Gibt an ob in Electron
 */
export const isElectron = _isElectron
export default el
