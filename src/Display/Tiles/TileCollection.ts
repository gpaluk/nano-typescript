import {Tile} from './Tile'
import {TileSet} from './TileSet'
import {Texture} from 'Display/Texture'

export class TileCollection {
    private _tiles: Tile[] = []

    public tileAt(value: number): Tile {
        return this._tiles[value]
    }

    public get tiles(): Tile[] {
        return this._tiles
    }

    public addTileSet(tileSet: TileSet): number {
        let x: number
        let y: number
        for (y = 0; y < tileSet.numTilesY; y++) {
            for (x = 0; x < tileSet.numTilesX; x++) {
                this._tiles.push(new Tile(tileSet, x, y))
            }
        }
        return length
    }

    public addTileSetRow(tileSet: TileSet, row: number): number {
        let x: number
        for (x = 0; x < tileSet.numTilesX; x++) {
            this._tiles.push(new Tile(tileSet, x, row))
        }
        return length
    }

    public addTexture(texture: Texture): number {
        this._tiles.push(new Tile(new TileSet(texture)))
        return length
    }

    public addTileCollection(tileCollection: TileCollection): number {
        let i: number
        for (i = 0; i < tileCollection.length; i++) {
            this._tiles.push(tileCollection.tileAt(i))
        }
        return length
    }

    public removeAt(index: number, length: number): void {
        this._tiles.splice(index, length)
    }

    public get length(): number {
        return this._tiles.length
    }
}
