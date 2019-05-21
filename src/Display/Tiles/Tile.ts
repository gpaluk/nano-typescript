import {TileBounds} from './TileBounds'
import {TileSet} from './TileSet'

export class Tile {
    private _tileX: number
    private _tileY: number
    private _tileSet: TileSet

    public bounds: TileBounds = TileBounds.NONE
    public mapCode: number = 0

    constructor(tileSet?: TileSet, tileX: number = 1, tileY: number = 1) {
        this._tileSet = tileSet
        this._tileX = tileX
        this._tileY = tileY
    }

    public static fromTile(tile: Tile) {
        let t: Tile = new Tile(tile.tileSet, tile.tileX, tile.tileY)
        t.mapCode = tile.mapCode
        t.bounds = tile.bounds
        return t
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

    public set tileX(value: number) {
        this._tileX = value
    }

    public get tileY(): number {
        return this._tileY
    }

    public set tileY(value: number) {
        this.tileY = value
    }

    public draw(x: number, y: number, width?: number, height?: number): void {
        this._tileSet.draw(this._tileX, this._tileY, x, y, width, height)
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

    // virtual
    public update(): void {}
}
