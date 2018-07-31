//@ts-check

// Import Electron
const { app, BrowserWindow, Tray } = require('electron')

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
const isSecondInstance = app.makeSingleInstance(
  (args, wd) => {
    BrowserWindow.getAllWindows()[0].show()
    handleProto(args)
  }
)

if (isSecondInstance) {
  app.quit()
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
  icon: logoURL
}

const loadingWindowOptions = {
  height: 280,
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
    mainWindow = null
  })
}

function createLoadingWindow() {
  loadingWindow = new BrowserWindow(loadingWindowOptions)
  loadingWindow.loadURL(loadingURL)
  loadingWindow.on('ready-to-show', () => {
    loadingWindow.show()
    setTimeout(() => {
      createWindow()
    }, 30000)
  })
  setupTray()
}

let tray

function setupTray() {
  tray = new Tray(logoURL)
  tray.setToolTip('EC-Verwaltungs-Application')
  tray.on('click', () => {
    BrowserWindow.getAllWindows()[0].show()
  })
}

//=================================================================================================================================================

// Wenn Bereit dann erzeuge Window
app.once('ready', createLoadingWindow)

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
