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

    public pause() {
        Stage.instance.pause()
    }

    public play(): void {
        Stage.instance.play()
    }

    public loadScene(screen: Scene) {
        if (this._currentScreen != null) {
            this._currentScreen.dispose()

            this._currentScreen.application = null

            let pos = this._children.indexOf(this._currentScreen)
            if (pos != -1) {
                this.removeChild(this._currentScreen)
            }
        }

        this._currentScreen = screen
        this._currentScreen.application = this
        this.addChild(this._currentScreen)
        this._currentScreen.init()
    }
}
