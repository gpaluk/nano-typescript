import {Scene} from 'App/Scene'
import {Assets} from 'Demo/Assets'
import {EventType} from 'Events/EventType'
import {Button} from 'GUI/Button'
import {AudioMixer} from 'Audio/AudioMixer'
import {Sprite} from 'Display/Sprite'
import {Color} from 'Display/Color'
import {GameScene} from './GameScene'

export class SplashScene extends Scene {
    public init(): void {
        this.assets.add(Assets.BUTTON_DOWN)
        this.assets.add(Assets.BUTTON_UP)
    }

    protected onAssetsComplete(): void {
        console.log('All of your assets were loaded.')

        this.createScene()
    }

    protected onAssetsError(e: Event): void {
        console.log('There was an error whilst loading your assets')
    }

    public createScene(): void {
        let buttonUp: Sprite = this.assets.getSprite(Assets.BUTTON_UP)
        let buttonOver: Sprite = this.assets.getSprite(Assets.BUTTON_UP)
        buttonOver.tint = new Color(1, 0, 0, 0.2)
        let buttonDown: Sprite = this.assets.getSprite(Assets.BUTTON_DOWN)

        let button: Button = new Button(buttonUp, buttonOver, buttonDown)
        button.addEventListener(EventType.CLICK, (e: Event) =>
            this.onButtonClick(e)
        )
        button.x = 400
        button.y = 500
        button.scale = 0.4
        this.addChild(button)
    }

    private onButtonClick(e: Event): void {
        AudioMixer.play(Assets.AUDIO_TEST)
        this.loadScene(new GameScene())
    }
}
