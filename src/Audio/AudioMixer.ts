import {AudioClip} from './AudioClip'

export class AudioMixer {
    private static _audioMap: Map<string, AudioClip> = new Map<
        string,
        AudioClip
    >()

    private static isEnabled: boolean = true

    public static add(
        id: string,
        audio: AudioClip,
        loop: boolean = false
    ): void {
        if (!this._audioMap.get(id)) {
            audio.loop = loop
            this._audioMap.set(id, audio)
        } else {
            console.warn('AudioMixer::add AudioMixer already contains key')
        }
    }

    public static play(id: string): void {
        if (this._audioMap.has(id) && this.isEnabled) {
            this._audioMap.get(id).play()
        }
    }

    public static pause(id: string): void {
        if (this._audioMap.has(id)) {
            this._audioMap.get(id).pause()
        }
    }

    public static pauseAll(): void {
        this._audioMap.forEach(
            (value): void => {
                value.pause()
            }
        )
    }

    public static stop(id: string): void {
        if (this._audioMap.has(id)) {
            this._audioMap.get(id).stop()
        }
    }

    public static stopAll(): void {
        this._audioMap.forEach(
            (value): void => {
                value.stop()
            }
        )
    }

    public static resume(): void {
        if (this.isEnabled) {
            this._audioMap.forEach(
                (value): void => {
                    if (value.isPlaying) {
                        value.play()
                    }
                }
            )
        }
    }
}
