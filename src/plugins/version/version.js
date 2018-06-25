import { version } from '../../../package.json'
export default version
import { config } from '../../../electron/package.json'
// const isPrerelease = false
export const isPrerelease =
  config.forge.publishers[0].prerelease
