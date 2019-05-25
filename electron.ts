import {app, BrowserWindow} from 'electron'
import * as url from 'url'
import * as path from 'path'

let mainWindow: BrowserWindow

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    console.log(__dirname.toString())

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '../../release/index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

    //mainWindow.webContents.openDevTools()

    mainWindow.on(
        'closed',
        (): void => {
            mainWindow = null
        }
    )
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
