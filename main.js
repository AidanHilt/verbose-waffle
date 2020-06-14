const { app, BrowserWindow, ipcMain} = require('electron');

let mainWindow = null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  //win.removeMenu();
  mainWindow.loadFile('index.html');

}

app.whenReady().then(createWindow);

/*
 Handling messages from windows. Most of this will involve
 forwarding messages between windows.
 */
ipcMain.on("add-item", function(event, arg){
  BrowserWindow.getFocusedWindow().close();
  mainWindow.webContents.send("add-item-forward", arg);
});