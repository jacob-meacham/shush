
declare module 'system-control' {
    export class audio {
      static muted(shushEnabled: boolean): Promise<void>
    }
}

declare module 'microphone-stream' {
    namespace MicrophoneStream {
        interface MicrophoneStreamOptions {
            stream?: MediaStream
            objectMode?: Boolean
            bufferSize?: Number
            context?: AudioContext
        }
    }
    
    class MicrophoneStream {
        constructor(opts: MicrophoneStream.MicrophoneStreamOptions)
        setStream(stream: MediaStream): void
        on(event: string, handler: (chunk: Buffer) => void): void
    }

    export = MicrophoneStream
}