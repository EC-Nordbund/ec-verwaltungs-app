const { app, BrowserWindow, shell, dialog } = require('electron')

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//=================================================================================================================================================
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/../renderer/index.html`;
const loadingURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/loading.html' : `file://${__dirname}/../renderer/loading.html`;

const mainWindowOptions = {
  height: 563,
  useContentSize: true,
  width: 1000,
  show: false,
};
const loadingWindowOptions = {
  height: 250,
  frame: false,
  useContentSize: true,
  width: 470,
  show: false,
  closable: false,
  resizable: false,
};
//=================================================================================================================================================

let loadingWindow;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow(mainWindowOptions);
  mainWindow.loadURL(winURL);
  mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    loadingWindow.setClosable(true);
    loadingWindow.close();
    mainWindow.maximize();
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

//=================================================================================================================================================

app.on('ready', createLoadingWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
