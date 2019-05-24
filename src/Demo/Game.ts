import {Application} from 'App/Application'
import {SplashScene} from './View/SplashScene'

export class Game extends Application {
    public constructor() {
        super()

        this.loadScene(new SplashScene())
    }
}
