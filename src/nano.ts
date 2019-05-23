import {Color} from 'Display/Color'
import {Stage} from 'Display/Stage'
import {EventType} from 'Events/EventType'
import {AssetLoader} from 'Loaders/AssetLoader'
import {Tweener} from 'Animation/Tweener'
import {Sprite} from 'Display/Sprite'
import {EaseType} from 'Animation/EaseType'
import {AudioMixer} from 'Audio/AudioMixer'
import {AnchorType} from 'Display/AnchorType'
import {TileSet} from 'Display/Tiles/TileSet'
import {TileAnimation} from 'Display/Tiles/TileAnimation'
import {TileMap} from 'Display/Tiles/TileMap'
import {MovieClip} from 'Display/MovieClip'
import {BlendMode} from 'Display/BlendMode'
import {Button} from 'GUI/Button'

/*
//Stage.init(800, 600, Color.RED, 30, true)
//let game: Game = new Game()
*/

let clearColor: Color = new Color(0.3, 0.6, 0.9, 1)
let stage = Stage.init(800, 600, clearColor, 30, true)

const BUNNY_PATH: string = './assets/bunny.png'
const STAR_PATH: string = './assets/star.png'
const ICE_SET_PATH: string = './assets/ice_set.png'
const MAP_DATA_PATH: string = './assets/map_data.json'
const AUDIO_TEST: string = './assets/audio.mp3'
const BUTTON_UP: string = './assets/button_up.png'
const BUTTON_DOWN: string = './assets/button_down.png'

let loader: AssetLoader = new AssetLoader()
loader.addEventListener(EventType.COMPLETE, onLoaderComplete)
loader.addEventListener(EventType.ERROR, onLoaderError)
loader.addEventListener(EventType.TIMEOUT, onLoaderTimeout)
loader.addEventListener(EventType.LOADED, onLoaderItemLoaded)

loader.add(BUNNY_PATH)
loader.add(STAR_PATH)
loader.add(ICE_SET_PATH)
loader.add(MAP_DATA_PATH)
loader.add(AUDIO_TEST)
loader.add(BUTTON_UP)
loader.add(BUTTON_DOWN)

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
    tileAnimation.frameRate = 10

    let tileMap: TileMap = new TileMap(10, 10)
    tileMap.x = 50
    tileMap.y = 50
    tileMap.rotate(0.03)
    tileMap.rotationSpeed = -0.01
    tileMap.velocity.set(5, 5)
    tileMap.animations.push(tileAnimation)
    tileMap.setData(tileSet, loader.getJson(MAP_DATA_PATH).data)

    let bunny: Sprite = loader.getSprite(BUNNY_PATH)
    bunny.blendMode = BlendMode.SOURCE_OVER
    bunny.anchorType = AnchorType.CENTER
    bunny.scale = 2
    bunny.smoothing = false
    bunny.graphics.fillStyle = '#FF0000'
    bunny.graphics.fillRect(0, 0, 10, 10)
    bunny.tint = new Color(0, 1, 0, 0.8)
    bunny.x = 300
    bunny.y = 300
    bunny.rotationSpeed = 1

    let star: Sprite = loader.getSprite(STAR_PATH)
    star.blendMode = BlendMode.HARD_LIGHT
    star.x = 30
    star.y = 30
    star.scale = 1.3
    star.alpha = 0.75
    star.tint = new Color(1, 0, 0, 0.5)
    star.smoothing = false
    star.anchorType = AnchorType.CENTER
    star.mask = BUNNY_PATH
    star.rotationSpeed = 2

    let frames: Sprite[] = [bunny, star]
    let mc: MovieClip = new MovieClip()
    mc.scale = 3
    mc.frames = frames
    mc.blendMode = BlendMode.COLOR
    mc.anchorType = AnchorType.CENTER
    mc.rotationSpeed = -4
    mc.x = 100
    mc.y = 100
    mc.framerate = 3
    mc.tint = new Color(1, 0, 0, 0.8)

    stage.root.addChild(tileMap)
    bunny.addChild(star)
    stage.root.addChild(bunny)
    stage.root.addChild(mc)

    Tweener.create(bunny)
        .translate(0, 300, 0, 300)
        .rotate(0, 1.4)
        .scale(2, 4, 2, 4)
        .alpha(0.1, 1)
        .duration(3)
        .easing(EaseType.BOUNCE_IN_OUT)
        .start()

    AudioMixer.add(AUDIO_TEST, loader.getAudioClip(AUDIO_TEST), true)

    /**
     * An event must be invoked to play audio in latest HTML5 spec
     * This is a temporary hack that will be refactored to handle events
     * through the scenegraph
     */
    /*
    stage.canvas.onclick = e => {
        AudioMixer.play(AUDIO_TEST)
    }
    */

    // button test
    let buttonUp: Sprite = loader.getSprite(BUTTON_UP)
    let buttonOver: Sprite = loader.getSprite(BUTTON_UP)
    buttonOver.tint = new Color(1, 0, 0, 0.2)
    let buttonDown: Sprite = loader.getSprite(BUTTON_DOWN)

    let button: Button = new Button(buttonUp, buttonOver, buttonDown)
    button.addEventListener(EventType.CLICK, onButtonClick)
    button.addEventListener(EventType.MOUSE_DOWN, onButtonDown)
    button.addEventListener(EventType.MOUSE_OVER, onButtonOver)
    button.addEventListener(EventType.MOUSE_UP, onButtonUp)
    button.addEventListener(EventType.MOUSE_OUT, onButtonOut)
    button.x = 400
    button.y = 500
    button.scale = 0.4
    stage.root.addChild(button)

    function onButtonClick(e: Event): void {
        console.log('Button was clicked')
        AudioMixer.play(AUDIO_TEST)
    }

    function onButtonDown(e: Event): void {
        console.log('Button was pressed')
    }

    function onButtonOver(e: Event): void {
        console.log('Button was rolled over')
    }

    function onButtonUp(e: Event): void {
        console.log('Button was released')
    }

    function onButtonOut(e: Event): void {
        console.log('Button was rolled out')
    }
}
