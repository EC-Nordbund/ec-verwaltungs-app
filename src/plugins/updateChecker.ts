import version, {
  isPrerelease
} from '@/plugins/version/version'

import electron, {
  isElectron,
  isProduction
} from '@/plugins/electron'

// Wenn isElectron + isProduction Chack für Upates
if (isElectron && isProduction) {
  ;(async () => {
    // get fetcher
    const fetch = eval("require('node-fetch')")

    // querx
    const res = await fetch(
      'https://api.github.com/repos/ecnordbund/ec-verwaltungs-app/releases'
    )

    // get Result
    const resultJSON: Array<{
      prerelease: boolean
      tag_name: string
      published_at: string
      assets: Array<{
        name: string
        browser_download_url: string
      }>
    }> = await res.json()

    const latest = resultJSON.filter(
      v => v.prerelease === isPrerelease
    )[0]

    if (latest.tag_name === `v${version}`) {
      return
    }

    const url = latest.assets
      .map(v => {
        const endungsArray = v.name.split('.')
        const endung = endungsArray[endungsArray.length - 1]
        return {
          url: v.browser_download_url,
          endung
        }
      })
      .filter(
        v =>
          v.endung ===
          (<any>{
            win32: 'exe',
            darwin: 'dmg',
            linux: 'deb'
          })[(<any>window).process.platform]
      )[0].url

    // show msgBox
    electron.remote.dialog.showMessageBox(
      {
        title: 'Update',
        type: 'info',
        message: `Ein Update ist verfügbar. Möchtest du es installieren?
          
Wir empfehlen dir das Update sofort zu installieren! (Dauer: wenige Minuten)`,
        buttons: ['Yes', 'No']
      },
      res => {
        if (res === 0) {
          // Download new Version
          electron.shell.openExternal(url)
        }
      }
    )
  })()
}
