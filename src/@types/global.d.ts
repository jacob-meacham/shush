
declare module 'system-control' {
    export class audio {
      static muted(muted: boolean): Promise<void>
      static muted(): Promise<boolean>
    }
}
