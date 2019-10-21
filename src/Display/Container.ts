import { Spatial } from './Spatial'

export class Container extends Spatial {
    protected _children: Spatial[]

    public constructor() {
        super()
        this._children = []
    }

    public dispose(): void {
        this.removeAllChildren()
        this._children = null

        super.dispose()
    }

    public get children(): Spatial[] {
        return this._children
    }

    public addChild(spatial: Spatial): void {
        if (this._children.lastIndexOf(spatial) != -1) {
            //TODO warn
            return
        }
        spatial.parent = this
        this._children.push(spatial)
    }

    public removeChild(spatial: Spatial): void {
        let index = this._children.lastIndexOf(spatial)
        if (index != -1) {
            spatial.parent = null
            spatial.dispose()
            this._children.splice(index, 1)
        }
    }

    public removeAllChildren(): void {
        this._children.forEach(
            (child): void => {
                child.parent = null
                this.removeChild(child)
            }
        )
        this._children = []
    }

    // override
    public updateWorldData(): void {
        super.updateWorldData()

        for (let child of this._children) {
            if (child != null) {
                child.update(false)
            }
        }
    }

    public draw(): void {
        for (let child of this._children) {
            if (child != null) {
                child.draw()
            }
        }
    }

    public drawDebug(): void {
        for (let child of this._children) {
            child.drawDebug()
        }
    }
}
