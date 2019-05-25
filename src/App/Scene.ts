import {Container} from 'Display/Container'
import {Application} from './Application'
import {AssetLoader} from 'Loaders/AssetLoader'
import {EventType} from 'Events/EventType'

export abstract class Scene extends Container {
    public assets: AssetLoader = new AssetLoader()
    public application: Application

    public constructor() {
        super()
        this.update()
    }

    public abstract init(): void

    protected loadScene(scene: Scene): void {
        this.application.loadScene(scene)
    }

    // internal
    public addEventListeners(): void {
        this.assets.addEventListener(
            EventType.COMPLETE,
            (e: Event): void => this.onAssetsComplete(e)
        )
        this.assets.addEventListener(
            EventType.TIMEOUT,
            (e: Event): void => this.onAssetsError(e)
        )
        this.assets.addEventListener(
            EventType.ERROR,
            (e: Event): void => this.onAssetsError(e)
        )
    }

    // internal
    public removeEventListeners(): void {
        this.assets.removeEventListener(
            EventType.COMPLETE,
            (e: Event): void => this.onAssetsComplete(e)
        )
        this.assets.removeEventListener(
            EventType.TIMEOUT,
            (e: Event): void => this.onAssetsError(e)
        )
        this.assets.removeEventListener(
            EventType.ERROR,
            (e: Event): void => this.onAssetsError(e)
        )
    }

    protected abstract onAssetsComplete(e: Event): void
    protected abstract onAssetsError(e: Event): void
    protected abstract onAssetsError(e: Event): void
}
