const { app, BrowserWindow, ipcMain, ipcRenderer} = require('electron');

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

//These involve being asked to open new windows
ipcMain.on("edit-item", function(event, arg){
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.removeMenu();
  win.loadFile('editItem.html');
  win.webContents.once("dom-ready", () => {
    win.webContents.send("edit-item-forward", arg);
  });
});

ipcMain.on("add-loan", function(event, arg){
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  win.removeMenu();
  win.loadFile("addLoan.html");

});

ipcMain.on("add-expense", function(event, arg){
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.removeMenu();
  win.loadFile("addExpenses.html");
});
//These all involve forwarding messages, mostly
//back to the main window
ipcMain.on("add-item", function(event, arg){
  BrowserWindow.getFocusedWindow().close();
  mainWindow.webContents.send("add-item-forward", arg);
});

ipcMain.on("update-edited-item", function(event, arg){
  BrowserWindow.getFocusedWindow().close();
  mainWindow.webContents.send("update-edited-item-forward", arg);
});

ipcMain.on("delete-item", function(event, arg){
  BrowserWindow.getFocusedWindow().close();
  mainWindow.webContents.send("delete-item-forward", arg);
});

ipcMain.on("added-loan", function(event, arg){
  BrowserWindow.getFocusedWindow().close();
  mainWindow.webContents.send("added-loan-forward", arg);
});

ipcMain.on("added-expense", function(event, arg){
  BrowserWindow.getFocusedWindow().close();
  console.log(arg);
  mainWindow.webContents.send("added-expense-forward", arg);
});