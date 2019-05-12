import { Transform } from "Geom/Transform";
import { Bound } from "./Bound";
import { Point } from "Geom/Point";

export abstract class Spatial
{
    public name: string = "";

    // internal use only
    public transform: Transform = Transform.IDENTITY;

    // internal use only
    public worldTransform: Transform = Transform.IDENTITY;

    protected _worldBoundIsDirty: boolean = true;
    protected _worldTransformIsDirty: boolean = true;

    protected _parent: Spatial;

    // internal use only
    protected _worldBound:Bound = Bound.IDENTITY;
    
    public velocity:Point = Point.ZERO;
    public rotationSpeed:number = 0;

    private _x:number;
    private _y:number;
    private _scaleX:number;
    private _scaleY:number;
    private _rotation:number;

    public dispose()
    {

    }

    public get x():number
    {
        return this._x;
    }

    public set x(value:number)
    {
        this._x = value;
        this._worldTransformIsDirty = true;
    }

    public get y():number
    {
        return this._y;
    }

    public set y(value:number)
    {
        this._y = value;
        this._worldTransformIsDirty = true;
    }

    public get scaleX():number
    {
        return this._scaleX;
    }

    public set scaleX(value:number)
    {
        this._scaleX = value;
        this._worldTransformIsDirty = true;
    }

    public get scaleY():number
    {
        return this._scaleY;
    }

    public set scaleY(value:number)
    {
        this._scaleY = value;
        this._worldTransformIsDirty = true;
    }

    public get rotation():number
    {
        return this._rotation;
    }

    public set rotation(value:number)
    {
        this._rotation = value;
        this._worldTransformIsDirty = true;
    }

    public get parent():Spatial
    {
        return this._parent;
    }

    public set parent(value:Spatial)
    {
        this._parent = value;
    }

    public update(applicationTime:number, initiator:boolean):void
    {
        //let dt = Timer.DeltaSeconds;
        if(!this.velocity.isZero)
        {
            this.x += this.velocity.x * applicationTime;
            this.y += this.velocity.y * applicationTime;
        }

        if(this.rotationSpeed != 0)
        {
            this.rotation += this.rotationSpeed * applicationTime;
        }

        this.updateWorldData(applicationTime);
        this.updateWorldBound();

        if(initiator)
        {
            this.propagateBoundToRoot();
        }
    }

    // virtual
    protected updateWorldData(applicationTime:number):void
    {
        // TODO updateController(applicationTime);

        if(this._worldTransformIsDirty)
        {
            this.transform.setTranslate(this._x, this._y);
            this.transform.setScale(this._scaleX, this._scaleY);
            this.transform.setRotate(this._rotation);

            if(this._parent != null)
            {
                this.worldTransform = Transform.multiply(this._parent.worldTransform, this.transform);
            }
            else
            {
                this.worldTransform = this.transform;
            }
        }
    }

    public updateModelSpace():void
    {
        this.updateModelBound();
    }

    public updateModelBound():void
    {
        // virtual
    }

    public updateWorldBound():void
    {
        // virtual
    }

    public propagateBoundToRoot():void
    {
        if(this._parent != null)
        {
            this._parent.updateWorldBound();
            this._parent.propagateBoundToRoot();
        }
    }

    public draw():void
    {
        // virtual
    }

    public drawDebug():void
    {
        // virtual
    }
}