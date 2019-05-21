import {Scene} from 'App/Scene'

export class GameScene extends Scene {
    public init(): void {
        console.log('Hello from game scene')
    }

    public dispose(): void {
        console.log('GameScene::disposing')
    }
}
