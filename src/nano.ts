import {Stage} from 'Display/Stage'
import {Color} from 'Display/Color'
import {Sprite} from 'Display/Sprite'
import {BlendMode} from 'Display/BlendMode'
import {AnchorType} from 'Display/AnchorType'
import {MovieClip} from 'Display/MovieClip'
import {EventType} from 'Events/EventType'
import {AssetLoader} from 'Loaders/AssetLoader'
import {TileSet} from 'Display/Tiles/TileSet'
import {AnimatedTile} from 'Display/Tiles/AnimatedTile'
import {TileAnimation} from 'Display/Tiles/TileAnimation'
import {Timer} from 'Utils/Timer'
import {TileMap} from 'Display/Tiles/TileMap'
import {Tile} from 'Display/Tiles/Tile'

let clearColor: Color = new Color(0.3, 0.6, 0.9, 1)
let stage = Stage.init(800, 600, clearColor, 30, true)

const BUNNY_PATH: string = './assets/bunny.png'
const STAR_PATH: string = './assets/star.png'
const ICE_SET_PATH: string = './assets/ice_set.png'
const MAP_DATA_PATH: string = './assets/map_data.json'

let loader: AssetLoader = new AssetLoader()
loader.addEventListener(EventType.COMPLETE, onLoaderComplete)
loader.addEventListener(EventType.ERROR, onLoaderError)
loader.addEventListener(EventType.TIMEOUT, onLoaderTimeout)
loader.addEventListener(EventType.LOADED, onLoaderItemLoaded)

loader.add(BUNNY_PATH)
loader.add(STAR_PATH)
loader.add(ICE_SET_PATH)
loader.add(MAP_DATA_PATH)
loader.load()

function onLoaderComplete(e: Event): void {
    console.log('Loading complete')
    buildScene()
}

function onLoaderItemLoaded(e: Event): void {
    console.log('Loaded item')
}

function onLoaderError(e: Event): void {
    console.log('An error occured whilst loading assets')
}

function onLoaderTimeout(e: Event): void {
    console.log('An timeout occured whilst loading assets')
}

function buildScene(): void {
    let tileSet: TileSet = loader.getTileSet(ICE_SET_PATH, 32, 32)

    let tileAnimation: TileAnimation = new TileAnimation(tileSet)
    tileAnimation.frameRate = 5

    let tileMap: TileMap = new TileMap(10, 10)
    tileMap.x = 100
    tileMap.y = 50
    tileMap.animations.push(tileAnimation)
    tileMap.setData(tileSet, loader.getJson(MAP_DATA_PATH).data)

    stage.root.addChild(tileMap)

    /*
    console.log('numTilesX: ' + tileSet.numTilesX)
    console.log('numTilesY: ' + tileSet.numTilesY)
    console.log('tileWidth: ' + tileSet.tileWidth)
    console.log('tileHeight: ' + tileSet.tileHeight)

    let tile: Tile = tileSet.getTile(0, 0)
    tile.draw(50, 60, 100, 100)

    tileSet.draw(4, 0, 50, 50, 100, 100)
    */

    /*
    let bunny: Sprite = loader.getSprite(BUNNY_PATH)
    bunny.blendMode = BlendMode.SOURCE_OVER
    bunny.anchor = AnchorType.CENTER
    bunny.scale = 1.3
    bunny.smoothing = false
    bunny.graphics.fillStyle = '#FF0000'
    bunny.graphics.fillRect(0, 0, 100, 100)
    bunny.tint = new Color(1, 1, 0, 0.5)
    bunny.x = 300
    bunny.y = 300
    bunny.rotationSpeed = 1
    bunny.update()

    let star: Sprite = loader.getSprite(STAR_PATH)
    star.blendMode = BlendMode.COLOR_BURN
    star.x = 30
    star.y = 30
    star.scale = 1.3
    star.alpha = 0.75
    star.tint = new Color(1, 0, 0, 0.5)
    star.smoothing = false
    star.anchor = AnchorType.CENTER
    star.mask = BUNNY_PATH
    star.rotationSpeed = 2

    bunny.addChild(star)
    stage.root.addChild(bunny)

    let frames: Sprite[] = [bunny, star]
    let mc: MovieClip = new MovieClip()
    mc.blendMode = BlendMode.COLOR_BURN
    mc.anchor = AnchorType.CENTER
    mc.rotationSpeed = -4
    mc.x = 100
    mc.y = 100
    mc.framerate = 2
    mc.tint = new Color(1, 0, 0, 0.8)
    mc.frames = frames
    stage.root.addChild(mc)
    */
}
