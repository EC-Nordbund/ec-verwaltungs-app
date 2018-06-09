import version, {
  isPrerelease
} from '@/plugins/version/version';

import {
  isElectron,
  isProduction
} from '@/plugins/electron';

if (isElectron && isProduction) {
  let fetch = eval("require('node-fetch')");
  fetch(
    'https://api.github.com/repos/ecnordbund/ec-verwaltungs-app/releases'
  )
    .then((v: any) => v.json())
    .then((v: Array<any>) =>
      v.filter(v => v.prerelease === isPrerelease)
    )
    .then((v: Array<any>) =>
      v.filter(v => v.tag_name !== 'v' + version)
    )
    .then((v: Array<any>) =>
      v.sort((a, b) => {
        if (a.published_at > b.published_at) {
          return -1;
        }
        if (a.published_at < b.published_at) {
          return 1;
        }
        return 0;
      })
    )
    .then(
      (v: Array<any>) =>
        v.length === 0
          ? false
          : v[0].assets
              .map((v: any) => ({
                v,
                ending: v.name.split('.')[
                  v.name.split('.').length - 1
                ]
              }))
              .filter(
                (v: any) =>
                  v.ending ===
                  (<any>{
                    win32: 'exe',
                    darwin: 'dmg',
                    linux: 'deb'
                  })[(<any>window).process.platform]
              )[0].v.url
    )
    .then(
      (v: any) =>
        v
          ? fetch(v)
              .then((v: any) => v.json())
              .then((v: any) => v.browser_download_url)
          : false
    )
    .then((v: any) => {
      if (v) {
        eval(
          "require('electron')"
        ).remote.dialog.showMessageBox(
          {
            title: 'Update',
            type: 'info',
            message:
              'Ein Update ist verfügbar. Möchtest du es installieren?\n\nWir empfehlen dir das Update sofort zu installieren!',
            buttons: ['Yes', 'No']
          },
          (res: number) => {
            if (res === 0) {
              eval(
                "require('electron')"
              ).shell.openExternal(v);
            }
          }
        );
      }
    });
}
