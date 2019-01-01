import { data } from '@/realPlugins/electron';
import Vue from 'vue';
const { electron, isElectron, isProduction, os } = data

export default {
  install(vue: typeof Vue) {
    if (isElectron && isProduction) {
      vue.prototype.$updateChecker = updateChecker
    } else {
      vue.prototype.$updateChecker = () => {}
    }
  }
}

export async function updateChecker() {
  if (electron && os) {
    const res = await fetch('https://ec-api.de/version')
    const resultJSON: { version: string } = await res.json()
    let url = ''
    switch (os.platform()) {
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
}
