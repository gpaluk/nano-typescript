import {Tile} from './Tile'
import {Texture} from 'Display/Texture'

export class TileSet {
    private _texture: Texture
    private _tileWidth: number = -1
    private _tileHeight: number = -1

    constructor(texture: Texture, tileWidth?: number, tileHeight?: number) {
        this._texture = texture

        if (tileWidth && tileHeight) {
            this._tileWidth = tileWidth
            this._tileHeight = tileHeight
        } else {
            this._tileWidth = texture.width
            this._tileHeight = texture.height
        }
    }

    public get tileWidth(): number {
        return this._tileWidth
    }

    public set tileWidth(value: number) {
        this._tileWidth = value
    }

    public get tileHeight(): number {
        return this._tileHeight
    }

    public set tileHeight(value: number) {
        this._tileHeight = value
    }

    public get texture(): Texture {
        return this._texture
    }

    public set texture(value: Texture) {
        this._texture = value
    }

    public get numTilesX(): number {
        return this._texture.width / this._tileWidth
    }

    public set numTilesX(value: number) {
        this._tileWidth = this._texture.width / value
    }

    public get numTilesY(): number {
        return this._texture.height / this._tileHeight
    }

    public set numTilesY(value: number) {
        this._tileHeight = this._texture.height / value
    }

    public getTile(x: number, y: number): Tile {
        return new Tile(this, x, y)
    }

    public getTileAt(index: number): Tile {
        let tilesWide = this.numTilesX
        let x = index % tilesWide
        return new Tile(this, x, (index - x) / tilesWide)
    }

    public draw(
        tileX: number,
        tileY: number,
        x?: number,
        y?: number,
        width?: number,
        height?: number
    ) {
        let sX: number = tileX * this._tileWidth
        let sY: number = tileY * this._tileHeight

        this._texture.draw(
            x,
            y,
            width,
            height,
            sX,
            sY,
            this._tileWidth,
            this._tileHeight
        )
    }
}
