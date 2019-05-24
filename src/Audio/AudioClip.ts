export class AudioClip {
    private _audio: HTMLAudioElement

    public isPlaying: boolean
    public loop: boolean
    private _pausedTime: number = 0

    public constructor(audio: HTMLAudioElement) {
        this._audio = audio
    }

    private playPromise(audio: HTMLAudioElement): void {
        let playPromise: Promise<void> = audio.play()

        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                })
                .catch(error => {
                    // Auto-play was prevented
                    console.warn('Audio autoplay was prevented')
                })
        }
    }

    public dispose() {
        this._audio = null
    }

    // internal
    public play() {
        this.isPlaying = true

        this.playPromise(this._audio)
        this._audio.currentTime = this._pausedTime
        this._audio.loop = this.loop
    }

    //internal
    public stop() {
        this.isPlaying = false
        this._audio.pause()
        this._audio.currentTime = 0
    }

    // internal
    public pause(): void {
        if (this._audio.loop) {
            this._audio.pause()
            this._pausedTime = this._audio.currentTime
        }
    }
}
