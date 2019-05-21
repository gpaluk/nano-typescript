import {Scene} from 'App/Scene'

export class TitleScene extends Scene {
    public init(): void {
        console.log('Hello from title scene')
    }

    public dispose(): void {
        console.log('TitleScene::disposing')
    }
}
