import { Scene } from 'App/Scene'
import { Assets } from 'Demo/Assets'
import { TileSet } from 'Display/Tiles/TileSet'
import { TileAnimation } from 'Display/Tiles/TileAnimation'
import { TileMap } from 'Display/Tiles/TileMap'
import { Sprite } from 'Display/Sprite'
import { BlendMode } from 'Display/BlendMode'
import { AnchorType } from 'Display/AnchorType'
import { Color } from 'Display/Color'
import { MovieClip } from 'Display/MovieClip'
import { Tweener } from 'Animation/Tweener'
import { EaseType } from 'Animation/EaseType'
import { AudioMixer } from 'Audio/AudioMixer'

export class GameScene extends Scene {
    protected onAssetsError(e: Event): void { }

    public init(): void {
        this.assets.add(Assets.BUNNY_PATH)
        this.assets.add(Assets.STAR_PATH)
        this.assets.add(Assets.ICE_SET_PATH)
        this.assets.add(Assets.MAP_DATA_PATH)
        this.assets.add(Assets.AUDIO_TEST)
    }

    protected onAssetsComplete(): void {
        console.log('All of your assets were loaded.')

        this.createScene()
    }

    private createScene(): void {
        let tileSet: TileSet = this.assets.getTileSet(
            Assets.ICE_SET_PATH,
            32,
            32
        )
        let tileAnimation: TileAnimation = new TileAnimation(tileSet)
        tileAnimation.frameRate = 10

        let tileMap: TileMap = new TileMap(10, 10)
        tileMap.x = 50
        tileMap.y = 50
        tileMap.rotate(0.03)
        tileMap.rotationSpeed = -0.01
        tileMap.velocity.set(5, 5)
        tileMap.animations.push(tileAnimation)
        tileMap.setData(tileSet, this.assets.getJson(Assets.MAP_DATA_PATH).data)

        let bunny: Sprite = this.assets.getSprite(Assets.BUNNY_PATH)
        bunny.blendMode = BlendMode.SOURCE_OVER
        bunny.anchorType = AnchorType.CENTER
        bunny.scale = 0.5
        bunny.smoothing = false
        bunny.graphics.fillStyle = '#FF0000'
        bunny.graphics.fillRect(0, 0, 10, 10)
        bunny.tint = new Color(0, 1, 0, 0.8)
        bunny.x = 300
        bunny.y = 300
        bunny.rotationSpeed = 1

        let star: Sprite = this.assets.getSprite(Assets.STAR_PATH)
        star.blendMode = BlendMode.HARD_LIGHT
        star.x = 30
        star.y = 30
        star.scale = 1.3
        star.alpha = 0.75
        star.tint = new Color(1, 0, 0, 0.5)
        star.smoothing = false
        star.anchorType = AnchorType.CENTER
        star.mask = Assets.BUNNY_PATH
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

        this.addChild(tileMap)
        bunny.addChild(star)
        this.addChild(bunny)
        this.addChild(mc)

        Tweener.create(bunny)
            .translate(0, 300, 0, 300)
            .rotate(0, 1.4)
            .scale(2, 4, 2, 4)
            .alpha(0.1, 1)
            .duration(3)
            .easing(EaseType.BOUNCE_IN_OUT)
            .start()

        AudioMixer.add(
            Assets.AUDIO_TEST,
            this.assets.getAudioClip(Assets.AUDIO_TEST),
            true
        )
        AudioMixer.play(Assets.AUDIO_TEST)
    }

    public dispose(): void {
        console.log('GameScene::disposing')
        super.dispose()
    }
}
