import {Tile} from './Tile'
import {TileAnimation} from './TileAnimation'
import {TileSet} from './TileSet'
import {Timer} from 'Utils/Timer'

export class AnimatedTile extends Tile {
    private _animation: TileAnimation
    private _frameProgression: number = 0
    public enabled: boolean = true

    constructor(animation?: TileAnimation) {
        super(animation.tileAt(0).tileSet)
        this._animation = animation
    }

    // override
    public get tileX(): number {
        return this._animation.tileAt(this._frameProgression).tileX
    }

    // override
    public set tileX(value) {
        this._animation.tileAt(this._frameProgression).tileX = value
    }

    // override
    public get tileY(): number {
        return this._animation.tileAt(this._frameProgression).tileY
    }

    // override
    public set tileY(value: number) {
        this._animation.tileAt(this._frameProgression).tileY = value
    }

    // override
    public get tileSet(): TileSet {
        return this._animation.tileAt(this._frameProgression).tileSet
    }

    // override
    public update(): void {
        if (this.enabled) {
            let frameRate = this._animation.frameRate

            if (frameRate != 0) {
                this._frameProgression += frameRate * Timer.deltaSeconds
                if (frameRate > 0) {
                    if (
                        this._frameProgression >= this._animation.frames.length
                    ) {
                        this._frameProgression = 0
                    }
                } else {
                    if (this._frameProgression < 0) {
                        this._frameProgression = this._animation.frames.length
                    }
                }
            }
        }
        super.update()
    }
}
