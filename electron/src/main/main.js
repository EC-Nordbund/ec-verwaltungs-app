// Import Electron
const {
  app,
  BrowserWindow,
  Tray,
  dialog,
  ipcMain
} = require('electron')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

require('electron-unhandled')()

app.setAsDefaultProtocolClient('ec', process.execPath)

function handleProto(args) {
  if (args.length > 1) {
    const splitted = args[1].split('ec://')
    if (splitted.length > 1) {
      mainWindow.webContents.send(
        'proto-set-route',
        splitted[1]
      )
    }
  }
}

// On Install do Stuff
if (require('electron-squirrel-startup')) {
  app.quit()
}

//Single Instance
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on(
    'second-instance',
    (commandLine, workingDirectory) => {
      BrowserWindow.getAllWindows()[0].show()
      handleProto(commandLine)
    }
  )
}

//=================================================================================================================================================

//Get URL's
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : `file://${__dirname}/../renderer/index.html`

const loadingURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/loading.html'
    : `file://${__dirname}/../renderer/loading.html`

const logoURL =
  process.env.NODE_ENV === 'development'
    ? `${__dirname}/../../../public/ec-logo-128.png`
    : `${__dirname}/../renderer/ec-logo-128.png`

//Get Settings
const mainWindowOptions = {
  height: 563,
  useContentSize: true,
  width: 1000,
  show: false,
  icon: logoURL,
  webPreferences: {
    nodeIntegration: true
  }
}

const loadingWindowOptions = {
  height: 288,
  frame: false,
  useContentSize: true,
  width: 480,
  show: false,
  closable: false,
  resizable: false,
  icon: logoURL
}

//=================================================================================================================================================

let loadingWindow
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow(mainWindowOptions)
  mainWindow.loadURL(winURL)
  mainWindow.on('ready-to-show', () => {
    loadingWindow.setClosable(true)
    loadingWindow.close()
    mainWindow.maximize()
    handleProto(process.argv)
  })
  mainWindow.on('closed', () => {
    if (helpWindow) {
      helpWindow.close()
    }
    mainWindow = null
  })
}

function createLoadingWindow() {
  loadingWindow = new BrowserWindow(loadingWindowOptions)
  loadingWindow.loadURL(loadingURL)
  loadingWindow.on('ready-to-show', () => {
    loadingWindow.show()
    setTimeout(() => {
      loadingWindow.webContents.send(
        'msg',
        'Teste Internet Verbindung'
      )
      require('dns').resolve('www.google.com', err => {
        if (err) {
          dialog.showErrorBox(
            'Keine Internet-Verbindung',
            'Zur Nutzung unserer App benötigts du eine aktive Internetverbindung! - Bitte überprüfe diese!'
          )
          loadingWindow.destroy()
          app.quit()
        } else {
          setTimeout(() => {
            const fetch = require('node-fetch')
            loadingWindow.webContents.send(
              'msg',
              'Teste API Verbindung'
            )
            fetch('https://ec-api.de/check')
              .then(() => {
                setTimeout(() => {
                  loadingWindow.webContents.send(
                    'msg',
                    'Öffne Anwedungsfenster'
                  )
                  createWindow()
                }, 500)
              })
              .catch(() => {
                dialog.showErrorBox(
                  'Keine API-Verbindung',
                  'Zur Nutzung unserer App ist eine Verbindung zu unserer API notwendig. Diese ist aktuell nicht gegeben.\nBitte Probiere es in 5-10 min nocheinmal. Sollte es dann immer noch Probleme geben schreibe bitte eine E-Mail an app@ec-nordbund.de!'
                )
                loadingWindow.destroy()
                app.quit()
              })
          }, 500)
        }
      })
    }, 2000)
  })
  setupTray()
}

let tray

function setupTray() {
  tray = new Tray(logoURL)
  tray.setToolTip('EC-Verwaltungs-Application')
  tray.on('click', () => {
    BrowserWindow.getAllWindows()[0]
  })
}

//=================================================================================================================================================

// Wenn alle Fenster zu dann quit (außer macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    tray.destroy()
    app.quit()
  }
})

// Wenn activate unter macOS recreate Windows
app.on('activate', () => {
  if (mainWindow === null) {
    createLoadingWindow()
  }
})

app.once('ready', createLoadingWindow)

ipcMain.on('set-UG', ($event, args) => {
  if (process.platform === 'win32') {
    switch (args) {
      case 'admin':
        app.setUserTasks([
          {
            program: process.execPath,
            arguments: 'ec:///app/personen',
            title: 'Personen',
            description: 'Liste der Personen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/arbeitskreise',
            title: 'Arbeitskreise',
            description: 'Liste der Arbeitskreise',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/verteiler',
            title: 'Verteiler',
            description: 'Liste der Verteiler',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungen',
            title: 'Veranstaltungen',
            description: 'Liste der Veranstaltungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungsorte',
            title: 'Veranstaltungsorte',
            description: 'Liste der Veranstaltungsorte',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/anmeldungen',
            title: 'Anmeldungen',
            description: 'Liste der Anmeldungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/profil',
            title: 'Profil',
            description: 'Editieren des eigenen Profils',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/admin',
            title: 'Admin',
            description: 'Administrative Aufgaben',
            iconPath: process.execPath,
            iconIndex: 0
          }
        ])
        break
      case 'vorsitzender':
        app.setUserTasks([
          {
            program: process.execPath,
            arguments: 'ec:///app/personen',
            title: 'Personen',
            description: 'Liste der Personen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/arbeitskreise',
            title: 'Arbeitskreise',
            description: 'Liste der Arbeitskreise',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/verteiler',
            title: 'Verteiler',
            description: 'Liste der Verteiler',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungen',
            title: 'Veranstaltungen',
            description: 'Liste der Veranstaltungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungsorte',
            title: 'Veranstaltungsorte',
            description: 'Liste der Veranstaltungsorte',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/anmeldungen',
            title: 'Anmeldungen',
            description: 'Liste der Anmeldungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/profil',
            title: 'Profil',
            description: 'Editieren des eigenen Profils',
            iconPath: process.execPath,
            iconIndex: 0
          }
        ])
        break
      case 'anmeldeverwaltung':
        app.setUserTasks([
          {
            program: process.execPath,
            arguments: 'ec:///app/personen',
            title: 'Personen',
            description: 'Liste der Personen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungen',
            title: 'Veranstaltungen',
            description: 'Liste der Veranstaltungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/anmeldungen',
            title: 'Anmeldungen',
            description: 'Liste der Anmeldungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/profil',
            title: 'Profil',
            description: 'Editieren des eigenen Profils',
            iconPath: process.execPath,
            iconIndex: 0
          }
        ])
        break
      case 'kasse':
        app.setUserTasks([
          {
            program: process.execPath,
            arguments: 'ec:///app/personen',
            title: 'Personen',
            description: 'Liste der Personen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungen',
            title: 'Veranstaltungen',
            description: 'Liste der Veranstaltungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/anmeldungen',
            title: 'Anmeldungen',
            description: 'Liste der Anmeldungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/profil',
            title: 'Profil',
            description: 'Editieren des eigenen Profils',
            iconPath: process.execPath,
            iconIndex: 0
          }
        ])
        break
      case 'veranstaltungsverwaltung':
        app.setUserTasks([
          {
            program: process.execPath,
            arguments: 'ec:///app/personen',
            title: 'Personen',
            description: 'Liste der Personen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungen',
            title: 'Veranstaltungen',
            description: 'Liste der Veranstaltungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/anmeldungen',
            title: 'Anmeldungen',
            description: 'Liste der Anmeldungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/profil',
            title: 'Profil',
            description: 'Editieren des eigenen Profils',
            iconPath: process.execPath,
            iconIndex: 0
          }
        ])
        break
      case 'veranstaltungsleiter':
        app.setUserTasks([
          {
            program: process.execPath,
            arguments: 'ec:///app/veranstaltungen',
            title: 'Veranstaltungen',
            description: 'Liste der Veranstaltungen',
            iconPath: process.execPath,
            iconIndex: 0
          },
          {
            program: process.execPath,
            arguments: 'ec:///app/profil',
            title: 'Profil',
            description: 'Editieren des eigenen Profils',
            iconPath: process.execPath,
            iconIndex: 0
          }
        ])
        break
      default:
        app.setUserTasks([])
        break
    }
    console.log(args)
  }
})

const helpURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : `file://${__dirname}/../docs/index.html`

const helpConfig = {
  useContentSize: true,
  show: false,
  icon: logoURL
}

let helpWindow

ipcMain.on('openHelp', () => {
  if (!helpWindow) {
    helpWindow = new BrowserWindow(helpConfig)
    helpWindow.loadURL(helpURL)
    helpWindow.once('ready-to-show', helpWindow.show)
    helpWindow.once('closed', () => {
      helpWindow = undefined
    })
  } else {
    helpWindow.show()
  }
})
