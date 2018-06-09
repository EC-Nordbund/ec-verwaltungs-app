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
    .then(v => v.json())
    .then(v => v.filter(v => v.prerelease === isPrerelease))
    .then(v => v.filter(v => v.tag_name !== 'v' + version))
    .then(v =>
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
      v =>
        v.length === 0
          ? false
          : v[0].assets
              .map(v => ({
                v,
                ending: v.name.split('.')[
                  v.name.split('.').length - 1
                ]
              }))
              .filter(
                v =>
                  v.ending ===
                  {
                    win32: 'exe',
                    darwin: 'dmg',
                    linux: 'deb'
                  }[window.process.platform]
              )[0].v.url
    )
    .then(
      v =>
        v
          ? fetch(v)
              .then(v => v.json())
              .then(v => v.browser_download_url)
          : false
    )
    .then(v => {
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
          res => {
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
