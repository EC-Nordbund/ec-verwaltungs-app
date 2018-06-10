import * as _ from 'electron-settings'
import { isElectron } from '@/plugins/electron'

const __: typeof _ = isElectron
  ? eval("require('electron-settings')")
  : null

export default __
