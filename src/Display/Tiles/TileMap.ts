import {Tile} from './Tile'
import {TileAnimation} from './TileAnimation'
import {Container} from 'Display/Container'
import {TileSet} from './TileSet'
import {AnimatedTile} from './AnimatedTile'
import {Matrix} from 'Geom/Matrix'
import {Stage} from 'Display/Stage'

export class TileMap extends Container {
    private _animations: TileAnimation[] = []

    private _tileOverlapX: number = 0
    private _tileOverlapY: number = 0

    private _tileWidth: number = 0
    private _tileHeight: number = 0
    private _tiles: Tile[][]

    constructor(width: number = 10, height: number = 10) {
        super()

        this._tiles = []

        for (let y = 0; y < height; y++) {
            this._tiles[y] = []
            for (let x = 0; x < width; x++) {
                this._tiles[y][x] = new Tile()
            }
        }
    }

    public getTile(x: number, y: number): Tile {
        return this._tiles[y][x]
    }

    public getTileAt(index: number): Tile {
        let tilesWide: number = this.mapWidth
        let x = index % tilesWide

        return this._tiles[(index - x) / tilesWide][x]
    }

    public setTileAt(index: number, tile: Tile): void {
        let tilesWide: number = this.mapWidth
        let x = index % tilesWide

        this._tiles[(index - x) / tilesWide][x] = tile
    }

    public get animations(): TileAnimation[] {
        return this._animations
    }

    public get tileWidth(): number {
        return this._tileWidth
    }

    public get tileHeight(): number {
        return this._tileHeight
    }

    public get mapWidth(): number {
        return this._tiles[0].length
    }

    public get mapHeight(): number {
        return this._tiles.length
    }

    public get tileOverlapX(): number {
        if (this._tileOverlapX == 0) {
            return this._tileWidth
        }
        return this._tileOverlapX
    }

    public set tileOverlapX(value: number) {
        this._tileOverlapX = value
    }

    public get tileOverlapY(): number {
        if (this._tileOverlapY == 0) {
            return this.tileHeight
        }
        return this._tileOverlapY
    }

    public set tileOverlapY(value: number) {
        this._tileOverlapY = value
    }

    // override
    public update(initiator: boolean = true): void {
        let x: number
        let y: number

        for (y = 0; y < this._tiles.length; y++) {
            for (x = 0; x < this._tiles[0].length; x++) {
                this._tiles[y][x].update()
            }
        }
        super.update(initiator)
    }

    // override
    public draw(): void {
        let x: number
        let y: number
        let tile: Tile
        let tileSet: TileSet

        let m: Matrix = this.worldTransform.matrix
        Stage.context.transform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12)

        let c = Stage.context

        c.save()

        if (x != 0 || y != 0) {
            c.translate(x, y)
        }

        if (this.rotation != 0) {
            c.rotate(this.rotation)
        }

        if (this.scaleX != 1 || this.scaleY != 1) {
            c.scale(this.scaleX, this.scaleY)
        }

        for (y = 0; y < this.mapHeight; y++) {
            for (x = 0; x < this.mapWidth; x++) {
                tile = this._tiles[y][x]
                if (tile != null) {
                    tileSet = tile.tileSet
                    if (tileSet != null) {
                        tileSet.draw(
                            tile.tileX,
                            tile.tileY,
                            this.tileOverlapX * x,
                            this.tileOverlapY * y,
                            this.tileWidth,
                            this.tileHeight
                        )
                    }
                }
            }
        }

        super.draw()
        c.restore()
    }

    public setData(
        tileSet: TileSet,
        data: number[],
        mapCodes?: number[],
        bounds?: number[]
    ) {
        let mapWidth: number = this._tiles[0].length
        let mapHeight: number = this._tiles.length

        this._tileWidth = tileSet.tileWidth
        this._tileHeight = tileSet.tileHeight

        let tiles: Tile[] = []

        let x: number
        let y: number
        for (y = 0; y < tileSet.numTilesY; y++) {
            for (x = 0; x < tileSet.numTilesX; x++) {
                let tile: Tile = new Tile(tileSet, x, y)
                tiles.push(tile)
            }
        }

        let index: number = 0
        for (y = 0; y < mapHeight; y++) {
            for (x = 0; x < mapWidth; x++) {
                switch (this.compareTo(data[index], 0)) {
                    case -1:
                        let animationIndex: number = Math.abs(data[index]) - 1
                        if (this._animations.length > animationIndex) {
                            this._tiles[y][x] = new AnimatedTile(
                                this._animations[animationIndex]
                            )
                        } else {
                            this._tiles[y][x] = new Tile()
                        }
                        break
                    case 0:
                        this._tiles[y][x] = new Tile()
                        break
                    case 1:
                        let val: number = data[index]
                        this._tiles[y][x] = Tile.fromTile(tiles[val - 1])
                        break
                }
                index++
            }
        }

        if (mapCodes) {
            index = 0
            for (y = 0; y < mapHeight; y++) {
                for (x = 0; x < mapWidth; x++) {
                    this._tiles[y][x].mapCode = mapCodes[index]
                    index++
                }
            }
        }

        if (bounds) {
            index = 0
            for (y = 0; y < mapHeight; y++) {
                for (x = 0; x < mapWidth; x++) {
                    this._tiles[y][x].bounds = bounds[index]
                    index++
                }
            }
        }
    }

    private compareTo(value: number, to: number) {
        if (value < to) {
            return -1
        } else if (value == to) {
            return 0
        } else {
            return 1
        }
    }
}
