import {Scene} from './Scene'
import {Stage} from 'Display/Stage'
import {Container} from 'Display/Container'

export class Application extends Container {
    private _currentScreen: Scene

    public get isPaused(): boolean {
        return Stage.instance.isPaused
    }

    public constructor() {
        super()
        Stage.instance.root = this
    }

    public pause(): void {
        Stage.instance.pause()
    }

    public play(): void {
        Stage.instance.play()
    }

    public loadScene(screen: Scene): void {
        if (this._currentScreen != null) {
            this._currentScreen.assets.clear()
            this._currentScreen.removeEventListeners()
            this._currentScreen.application = null

            this.removeAllChildren()
        }

        this._currentScreen = screen
        this._currentScreen.application = this
        this.addChild(this._currentScreen)
        this._currentScreen.addEventListeners()
        this._currentScreen.init()
        this._currentScreen.assets.load()
    }
}
