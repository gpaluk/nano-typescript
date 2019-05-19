import {Stage} from 'Display/Stage'
import {Color} from 'Display/Color'
import {Sprite} from 'Display/Sprite'
import {BlendMode} from 'Display/BlendMode'
import {AnchorType} from 'Display/AnchorType'
import {MovieClip} from 'Display/MovieClip'

let clearColor: Color = new Color(0.3, 0.6, 0.9, 1)
let stage: Stage = Stage.init(800, 600, clearColor, 30, true)

let bunny: Sprite = new Sprite()
bunny.blendMode = BlendMode.SOURCE_OVER
bunny.anchor = AnchorType.CENTER
bunny.scale = 1.3
bunny.smoothing = false
bunny.graphics.fillStyle = '#FF0000'
bunny.graphics.fillRect(0, 0, 100, 100)
bunny.image = './assets/bunny.png'
bunny.tint = new Color(1, 1, 0, 0.5)
bunny.x = 300
bunny.y = 300
bunny.rotationSpeed = 1
bunny.update()

let star: Sprite = new Sprite()
star.blendMode = BlendMode.COLOR_BURN
star.x = 30
star.y = 30
star.scale = 1.3
star.alpha = 0.75
star.tint = new Color(1, 0, 0, 0.5)
star.smoothing = false
star.anchor = AnchorType.CENTER
star.image = './assets/star.png'
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
