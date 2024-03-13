const { app, BrowserWindow, ipcRenderer, ipcMain } = require("electron")
const path = require("node:path")

var win;
var setting;

const createWindow = () =>  {
    win = new BrowserWindow({
        minWidth: 400,
        minHeight: 500,
        maxHeight: 600,
        maxWidth: 1000,
        width: 400,
        height: 500,
        alwaysOnTop: true,
        maximizable: false,
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            defaultFontFamily: "sansSerif",
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    setting = new BrowserWindow({
        parent: win,
        modal: true,
        show: false,
        resizable: false,
        height: 300,
        autoHideMenuBar: true,
        width:400,
        closable: false,
        minimizable: false,
        webPreferences: {
            defaultFontFamily: "sansSerif",
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    setting.loadFile('./src/html/setting.html')
    win.loadFile('./src/html/index.html')
    win.on('close', () => {
        app.quit()
    })
}

app.whenReady().then(() => {
    ipcMain.handle('setting', () => {
        setting.show()
    })

    ipcMain.handle('closeSetting', () => {
        setting.hide()
    })
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})