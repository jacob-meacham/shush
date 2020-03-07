const { ipcRenderer, createMicrophoneStream } = window

let isEnabled = true
//const micStream = createMicrophoneStream({ context: audioContext })
let analyzer: AnalyserNode
let bufferLength: number
let dataArray: Uint8Array

navigator.getUserMedia({
    audio: true,
    video: false
}, handleStream, handleError)

function handleStream (stream: MediaStream) {
    console.log('Handling user stream')
    //micStream.setStream(stream)
    const audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)
    analyzer = audioContext.createAnalyser()
    analyzer.fftSize = 2048
    analyzer.connect(audioContext.destination)
    bufferLength = analyzer.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
    a()
}

function a() {
    analyzer.getByteTimeDomainData(dataArray)
    ipcRenderer.send('mic-stream', {
        max: analyzer.maxDecibels,
    })
    requestAnimationFrame(a)
}

function handleError (e: MediaStreamError) {
    console.log(e)
}

// micStream.on('data', function(chunk: Buffer) {
//     ipcRenderer.send('mic-stream', {
//         max: analyzer.maxDecibels,
//         enabled: isEnabled
//     })
// })

window.ipcRenderer.on('enabled', (event, enabled) => {
    isEnabled = enabled
})
