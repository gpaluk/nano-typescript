import {TileBounds} from './TileBounds'
import {TileSet} from './TileSet'

export class Tile {
    private _tileX: number
    private _tileY: number
    private _tileSet: TileSet

    public bounds: TileBounds = TileBounds.NONE
    public mapCode: number = 0

    constructor(tileSet?: TileSet, tileX: number = 0, tileY: number = 0) {
        tileSet = tileSet
        this._tileX = tileX
        this._tileY = tileY
    }

    public get left(): boolean {
        return (this.bounds & TileBounds.LEFT) == TileBounds.LEFT
    }

    public get bottom(): boolean {
        return (this.bounds & TileBounds.BOTTOM) == TileBounds.BOTTOM
    }

    public get right(): boolean {
        return (this.bounds & TileBounds.RIGHT) == TileBounds.RIGHT
    }

    public get top(): boolean {
        return (this.bounds & TileBounds.TOP) == TileBounds.TOP
    }

    public get tileSet(): TileSet {
        return this._tileSet
    }

    public get tileX(): number {
        return this._tileX
    }

    public get tileY(): number {
        return this._tileY
    }

    public draw(x: number, y: number, width?: number, height?: number): void {
        if (width && height) {
            this._tileSet.draw(this._tileX, this._tileY, x, y, width, height)
        } else {
            this._tileSet.draw(this._tileX, this._tileY, x, y)
        }
    }

    public set(
        tileSet: TileSet,
        tileX: number,
        tileY: number,
        mapCode: number = 0,
        bounds: TileBounds = TileBounds.NONE
    ): void {
        this._tileSet = tileSet
        this._tileX = tileX
        this._tileY = tileY
        this.mapCode = mapCode
        this.bounds = bounds
    }
}
