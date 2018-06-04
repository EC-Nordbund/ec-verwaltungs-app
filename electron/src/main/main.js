const { app, BrowserWindow } = require('electron')

// import './testServer'

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

console.log(__dirname)

/**
 * Ermittelt die URL für das Main-Window
 * @exports main/mainWindowURL
 * @type String
 * @constant
 */
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/../renderer/index.html`;

/**
 * Ermittelt die URL für das Main-Window
 * @exports main/mainWindowURL
 * @type String
 * @constant
 */
const loadingURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/loading.html' : `file://${__dirname}/../renderer/loading.html`;

/**
 * Optionen mit denen das Browserwindow gestartet wird
 * @exports main/mainWindowOptions
 * @constant
 * @type BrowserWindowOptions
 */
const mainWindowOptions = {
  height: 563,
  useContentSize: true,
  width: 1000,
  show: false,
};

/**
 * @type BrowserWindow
 * @exports main/loadingWindow
 */
let loadingWindow;


/**
 * Optionen mit denen das Browserwindow gestartet wird
 * @exports main/mainWindowOptions
 * @constant
 * @type BrowserWindowOptions
 */
const loadingWindowOptions = {
  height: 250,
  frame: false,
  useContentSize: true,
  width: 470,
  show: false,
  closable: false,
  resizable: false,
};

/**
 * @type BrowserWindow
 * @exports main/mainWindow
 */
let mainWindow;

/**
 * Erzeugt das MainWindow
 */
function createWindow() {
  mainWindow = new BrowserWindow(mainWindowOptions);
  mainWindow.loadURL(winURL);
  mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    loadingWindow.setClosable(true);
    loadingWindow.close();
    mainWindow.maximize();
    // mainWindow.show();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


function createLoadingWindow() {
  loadingWindow = new BrowserWindow(loadingWindowOptions);
  loadingWindow.loadURL(loadingURL);
  loadingWindow.on('ready-to-show', () => {
    loadingWindow.show();
    setTimeout(() => {
      createWindow();
    }, 2000);
  });
}


/**
 * Wenn Bereit erzeuge MainWindow
 */
app.on('ready', createLoadingWindow);


/**
 * Wenn alle Fenster geschlossen beende Programm (außer in macOS)
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * macOS reaktivieren des Programms
 */
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
