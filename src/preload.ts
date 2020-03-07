import { ipcRenderer, IpcRenderer } from 'electron'
import { audio } from 'system-control'
import MicrophoneStream from 'microphone-stream'

declare global {
    interface Window { 
        ipcRenderer: IpcRenderer;
        audio: audio;
        createMicrophoneStream: (opts?: MicrophoneStream.MicrophoneStreamOptions) => MicrophoneStream;
    }
}

window.ipcRenderer = ipcRenderer
window.audio = audio
window.createMicrophoneStream = (opts?: MicrophoneStream.MicrophoneStreamOptions) => {
    return new MicrophoneStream(opts)
}