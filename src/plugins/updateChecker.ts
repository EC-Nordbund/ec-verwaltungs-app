import version, {
  isPrerelease
} from '@/plugins/version/version'

import electron, {
  isElectron,
  isProduction
} from '@/plugins/electron'

if (isElectron && isProduction) {
  ;(async () => {
    const fetch = eval("require('node-fetch')")

    const res = await fetch(
      'https://api.github.com/repos/ecnordbund/ec-verwaltungs-app/releases'
    )

    const resultJSON: Array<{
      prerelease: boolean
      tag_name: string
      published_at: string
      assets: Array<{
        name: string
        browser_download_url: string
      }>
    }> = await res.json()

    const filterdResult = resultJSON
      .filter(v => v.prerelease === isPrerelease)
      .filter(v => v.tag_name !== 'v' + version)

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

    if (sortedFilterdResult.length === 0) {
      return
    }

    const currentVersion = sortedFilterdResult[0]

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

    if (assets.length !== 1) {
      return
    }

    const url = assets[0].browser_download_url

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
          electron.shell.openExternal(url)
        }
      }
    )
  })()
}
