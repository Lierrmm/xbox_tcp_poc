const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
  let loading = new BrowserWindow({ show: false, frame: false, transparent: true });
  loading.once('show', () => {
    mainWindow = new BrowserWindow({ show: false,  width: 800, height: 600, maximizable: false,
      webPreferences: { preload: path.join(__dirname, 'preload.js') }, autoHideMenuBar: true
    });
    mainWindow.webContents.once('dom-ready', () => {
      setTimeout(() => {
        mainWindow.show();
        loading.hide();
        loading.close();
      }, 2100);
    });
    mainWindow.loadFile('index.html');
  });
  loading.loadFile('loading.html');
  loading.show();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
