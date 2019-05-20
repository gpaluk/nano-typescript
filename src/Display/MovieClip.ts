import {Sprite} from './Sprite'
import {Timer} from 'Utils/Timer'

export class MovieClip extends Sprite {
    private _frames: Sprite[] = []
    private _currentFrame: number = 0

    private _framerate: number = 30
    private _accumulator: number = 0
    private _updateInterval: number = 0
    private _isPaused: boolean = false

    constructor() {
        super()
    }

    public dispose(): void {
        for (let sprite of this._frames) {
            sprite.dispose()
        }
        super.dispose()
    }

    public get framerate(): number {
        return this._framerate
    }

    public set framerate(value: number) {
        this._framerate = value
        this._updateInterval = 1 / value
    }

    public get frames() {
        return this._frames
    }

    public set frames(value: Sprite[]) {
        this._frames = value
        this.frame = 0
    }

    public set frame(frame: number) {
        this._currentFrame = frame
        if (this._frames[this._currentFrame] != null) {
            this.texture = this._frames[this._currentFrame].texture
        }
    }

    public play(): void {
        this._isPaused = false
    }

    public stop(): void {
        this._isPaused = true
    }

    public update(initiator: boolean = true): void {
        if (!this._isPaused) {
            this._accumulator += Timer.deltaSeconds
            while (this._accumulator >= this._updateInterval) {
                this._currentFrame++
                if (this._currentFrame >= this._frames.length) {
                    this._currentFrame = 0
                }
                this._accumulator -= this._updateInterval
                this.frame = this._currentFrame
            }
        }

        super.update(initiator)
    }
}
