import { ipcRenderer, IpcRenderer } from 'electron'
import log, { ElectronLog } from 'electron-log'

log.info('Running preloader')

declare global {
    interface Window { 
        ipcRenderer: IpcRenderer;
        log: ElectronLog;
    }
}

window.ipcRenderer = ipcRenderer
window.log = log
