import {Tile} from './Tile'
import {TileSet} from './TileSet'
import {TileCollection} from './TileCollection'

export class TileAnimation {
    public frameRate: number = 30
    public name: string = ''
    private _frames: TileCollection = new TileCollection()

    public constructor(tileset?: TileSet) {
        this._frames.addTileSet(tileset)
    }

    public get frames(): Tile[] {
        return this._frames.tiles
    }

    public tileAt(index: number): Tile {
        return this._frames.tileAt(Math.floor(index))
    }
}
