import {Scene} from 'App/Scene'

export class SplashScene extends Scene {
    public init(): void {
        console.log('Hello from splash scene')
    }

    public dispose(): void {
        console.log('SplashScene::disposing')
    }
}
