import { Spatial } from "./Spatial";

export class Container extends Spatial
{
    protected _children:Spatial[];

    constructor()
    {
        super();
        this._children = [];
    }

    public dispose()
    {
        this.removeAllChildren();
        super.dispose();
    }

    public addChild(spatial:Spatial):void
    {
        if(this._children.lastIndexOf(spatial) == -1)
        {
            return;
        }
        spatial.parent = this;
        this._children.push(spatial);
    }

    public removeChild(spatial:Spatial):void
    {
        let index = this._children.lastIndexOf(spatial);
        if(index != -1)
        {
            spatial.parent = null;
            this._children.splice(index, 1);
        }
    }

    public removeAllChildren()
    {
        for(let child of this._children)
        {
            child.parent = null;
            child.dispose();
        }
        this._children = null;
    }

    // override
    public updateWorldData(applicationTime:number):void
    {
        super.updateWorldData(applicationTime);

        for(let child of this._children)
        {
            child.update(applicationTime, false);
        }
    }

    public draw():void
    {
        for(let child of this._children)
        {
            child.draw();
        }
    }
}