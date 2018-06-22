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

    // filter Result
    const filterdResult = resultJSON
      .filter(v => v.prerelease === isPrerelease)
      .filter(v => v.tag_name !== 'v' + version)

    // Sort Result
    const sortedFilterdResult = filterdResult.sort(
      (a, b) => {
        if (a.published_at > b.published_at) {
          return -1
        }
        if (a.published_at < b.published_at) {
          return 1
        }
        return 0
      }
    )

    // Testen ob keine neue Version vorhanden
    if (sortedFilterdResult.length === 0) {
      return
    }

    // get Version auf die geupdatet werden kann
    const currentVersion = sortedFilterdResult[0]

    // get asset
    const assets = currentVersion.assets.filter(v => {
      const endung = v.name.split('.')[
        v.name.split('.').length - 1
      ]

      return (
        endung ===
        (<any>{
          win32: 'exe',
          darwin: 'dmg',
          linux: 'deb'
        })[(<any>window).process.platform]
      )
    })

    //check ob asset vorhanden
    if (assets.length !== 1) {
      return
    }

    // get Download URL
    const url = assets[0].browser_download_url

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
