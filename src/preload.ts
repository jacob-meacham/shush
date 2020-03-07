import { ipcRenderer, IpcRenderer } from 'electron'

declare global {
    interface Window { 
        ipcRenderer: IpcRenderer;
    }
}

window.ipcRenderer = ipcRenderer
