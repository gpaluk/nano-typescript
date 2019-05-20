import {Stage} from 'Display/Stage'
import {Color} from 'Display/Color'
import {Sprite} from 'Display/Sprite'
import {BlendMode} from 'Display/BlendMode'
import {AnchorType} from 'Display/AnchorType'
import {MovieClip} from 'Display/MovieClip'
import {EventType} from 'Events/EventType'
import {AssetLoader} from 'Loaders/AssetLoader'

let clearColor: Color = new Color(0.3, 0.6, 0.9, 1)
let stage = Stage.init(800, 600, clearColor, 30, true)

let loader: AssetLoader = new AssetLoader()
loader.addEventListener(EventType.COMPLETE, onLoaderComplete)
loader.addEventListener(EventType.ERROR, onLoaderError)
loader.addEventListener(EventType.TIMEOUT, onLoaderTimeout)
loader.addEventListener(EventType.LOADED, onLoaderItemLoaded)

loader.add('./assets/bunny.png')
loader.add('./assets/star.png')
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
    let bunny: Sprite = loader.getSprite('./assets/bunny.png')
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

    let star: Sprite = loader.getSprite('./assets/star.png')
    star.blendMode = BlendMode.COLOR_BURN
    star.x = 30
    star.y = 30
    star.scale = 1.3
    star.alpha = 0.75
    star.tint = new Color(1, 0, 0, 0.5)
    star.smoothing = false
    star.anchor = AnchorType.CENTER
    star.mask = './assets/bunny.png'
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
}
