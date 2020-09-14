const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

function createWindow() {
    require('devtron').install()
    const mainWindow = new BrowserWindow({
            width: 1024,
            height: 680,
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js')
            }
        })
        // 本地环境使用 3000端口   生产环境使用 index.html
    const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`
    mainWindow.loadURL(urlLocation)
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})