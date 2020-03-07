import { app, Tray, Menu, systemPreferences, ipcMain } from 'electron'
import { menubar, Menubar } from 'menubar'
import * as path from 'path'
import { audio } from 'system-control'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'

try {
  require('electron-reloader')(module)
  require('electron-debug')
} catch (_) {}

let menuBar : Menubar
let shushEnabled = true;
(async () => {
  try {
    await app.whenReady()

    const tray = new Tray(path.resolve(__dirname, '..', 'assets', 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Shush enabled', type: 'checkbox', checked: shushEnabled, click: setShushEnabled },
      { type: 'separator' },
      { label: 'Quit shush', role: 'quit' }
    ])
    tray.setContextMenu(contextMenu)

    menuBar = menubar({
      index: `file://${path.resolve(__dirname, '..', 'index.html')}`,
      tray,
      preloadWindow: true,
      browserWindow: {
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js')
        }
      }
    })

    menuBar.on('ready', initShush)
  } catch (e) {
    log.error(e)
  }
})()

async function initShush() {
  log.info('Initializing shush')
  log.info('Checking for updates...')
  autoUpdater.checkForUpdatesAndNotify()

  log.info('Checking for microphone access...')
  try {
    const access = await systemPreferences.askForMediaAccess('microphone')
    if (!access) {
      log.error('No microphone access allowed')
      return
    }
  } catch (e) {
    log.error(e)
  }
}

async function setShushEnabled() {
  shushEnabled = !shushEnabled
  menuBar.window.webContents.send('enabled', shushEnabled)
}

ipcMain.on('shush', async (event, data = {}) => {
  log.info('Shush!', data)
  await audio.muted(true)
})


