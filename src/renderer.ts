const { ipcRenderer } = window

interface Shusher {
    analyze(): { shouldShush: boolean, data?: object }
}

class VolumeShusher implements Shusher {
    analyzer: AnalyserNode
    dataArray: Uint8Array

    constructor(audioContext: AudioContext, source: AudioNode) {
        this.analyzer = audioContext.createAnalyser()
        
        this.analyzer.fftSize = 2048
        source.connect(this.analyzer)

        this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount)
    }

    analyze() {
        this.analyzer.getByteFrequencyData(this.dataArray)
    
        // Get the peak frequency value.
        var peakFrequency = Math.max.apply(null, this.dataArray)

        return {
            shouldShush: peakFrequency > 200,
            data: {
                peakFrequency
            }
        }
    }
}

// TODO
class NLPShusher implements Shusher {
    analyze() {
        return {
            shouldShush: false
        }
    }

    start() {

    }
}

let isEnabled = true
let shusher: Shusher

navigator.getUserMedia({
    audio: true,
    video: false
}, handleStream, handleError)

function handleStream (stream: MediaStream) {
    console.log('Handling user stream')
    const audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)

    shusher = new VolumeShusher(audioContext, source)
    analyze()
}

function analyze() {
    if (isEnabled) {
        const { shouldShush, data } = shusher.analyze()
        if (shouldShush) {
            ipcRenderer.send('shush', data)
        }
    }

    requestAnimationFrame(analyze)
}

function handleError (e: MediaStreamError) {
    console.log(e)
}

window.ipcRenderer.on('enabled', (event, enabled) => {
    isEnabled = enabled
})
