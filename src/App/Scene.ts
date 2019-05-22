import {Container} from 'Display/Container'
import {Application} from './Application'
import {AssetLoader} from 'Loaders/AssetLoader'

export abstract class Scene extends Container {
    public application: Application
    public static assets: AssetLoader = new AssetLoader()
    public abstract init(): void
    public abstract dispose(): void
}
