import {Scene} from 'App/Scene'

export class TitleScene extends Scene {
    protected onAssetsComplete(e: Event): void {
        throw new Error('Method not implemented.')
    }
    protected onAssetsError(e: Event): void {
        throw new Error('Method not implemented.')
    }
    public init(): void {
        console.log('Hello from title scene')
    }

    public dispose(): void {
        console.log('TitleScene::disposing')
    }
}
