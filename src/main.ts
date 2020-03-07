import { app, Tray, Menu, systemPreferences, ipcMain } from 'electron'
import { menubar, Menubar } from 'menubar'
import * as path from 'path'

try {
  require('electron-reloader')(module)
  require('electron-debug')
} catch (_) {}

let menuBar : Menubar
let shushEnabled = true;
(async () => {
  try {
    await app.whenReady()
    
    // const tray = new Tray(path.join('assets', 'icon.png'))
    // const contextMenu = Menu.buildFromTemplate([
    //   { label: 'Shush enabled', type: 'checkbox', checked: shushEnabled, click: setShushEnabled },
    //   { type: 'separator' },
    //   { label: 'Quit shush', role: 'quit' }
    // ])
    // tray.setContextMenu(contextMenu)

    menuBar = menubar({
      dir: '.',
      icon: path.join('assets', 'icon.png'),
      //tray,
      preloadWindow: true,
      browserWindow: {
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js')
        }
      }
    })

    menuBar.on('ready', initShush)
  } catch (e) {
    console.log(e)
  }
})()

async function initShush() {
  menuBar.window.webContents.openDevTools()
  const access = await systemPreferences.askForMediaAccess('microphone')
  if (!access) {
    // TODO: Handle
    return
  }
}

async function setShushEnabled() {
  shushEnabled = !shushEnabled
  menuBar.window.webContents.send('enabled', shushEnabled)
}

ipcMain.on('mic-stream', (event, obj) => {
  console.log(obj)
})


