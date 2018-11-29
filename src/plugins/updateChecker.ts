import electron, { isElectron, isProduction } from '@/plugins/electron';
import version, { isPrerelease } from '@/plugins/version/version';

// Wenn isElectron + isProduction Chack für Upates
;(async () => {
  // get fetcher
  const fetch = eval("require('node-fetch')")

  // querx
  const res = await fetch('https://ec-api.de/version')

  // get Result
  const resultJSON: {
    version: string
  } = await res.json()

  if (version !== resultJSON.version) {
    let url = ''

    switch (eval("require('os').platform()")) {
      case 'win32':
        url = `https://github.com/EC-Nordbund/ec-verwaltungs-app/releases/download/v${
          resultJSON.version
        }/EC-Verwaltungs-App-${
          resultJSON.version
        }.Setup.exe`
        break
      case 'darwin':
        url = `https://github.com/EC-Nordbund/ec-verwaltungs-app/releases/download/v${
          resultJSON.version
        }/EC-Verwaltungs-App-${resultJSON.version}.dmg`
        break
      default:
        url = `https://github.com/EC-Nordbund/ec-verwaltungs-app/releases/download/v${
          resultJSON.version
        }/ec-verwaltungs-app_${
          resultJSON.version
        }_amd64.deb`
        break
    }

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
  }
})()
