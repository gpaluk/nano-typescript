import { BlendMode } from "./BlendMode";
import { Point } from "Geom/Point";
import { Container } from "./Container";
import { Matrix } from "Geom/Matrix";
import { Stage } from "./Stage";
import { Color } from "./Color";
import { AnchorType } from "./AnchorType";

export class Sprite extends Container
{
    public alpha:number = 1;
    public smoothing:boolean = true;
    public blendMode:BlendMode = BlendMode.SOURCE_OVER;

    public pivot:Point = Point.ZERO;

    private _targetCanvas:HTMLCanvasElement;
    private _targetContext:CanvasRenderingContext2D;

    public canvas:HTMLCanvasElement;
    public graphics:CanvasRenderingContext2D;

    private _tint:Color;
    private _image:HTMLImageElement;
    private _mask:HTMLImageElement;

    // TODO Dynamic allocation
    private _width:number = 100;
    private _height:number = 100;

    private _isDirty:boolean = true;

    constructor()
    {
        super();

        this._targetCanvas = document.createElement('canvas') as HTMLCanvasElement;
        this._targetContext = this._targetCanvas.getContext('2d');

        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.graphics = this.canvas.getContext('2d');

        this._image = document.createElement('img');
        this._image.onload = () => { this._isDirty = true; };
        this._image.onerror = () => { this._image.src = ""; }

        this._mask = document.createElement('img');
        this._mask.onload = () => { this._isDirty = true; };
        this._mask.onerror = () => { this._mask.src = ""; }
    }

    //override
    public update(initiator:boolean = true):void
    {
        // TODO update model space

        super.update(initiator);
    }
    
    // override
    public draw():void
    {
        if(this.alpha < Number.EPSILON)
        {
            return;
        }

        if(this._isDirty)
        {
            this.redraw();
        }

        let context = Stage.context;

        let m:Matrix = this.worldTransform.matrix;
        context.globalAlpha = this.alpha;
        context.imageSmoothingEnabled = this.smoothing;
        context.globalCompositeOperation = this.blendMode;
        context.setTransform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12);

        let target = this._targetContext;
        target.globalAlpha = this.alpha;
        context.drawImage(target.canvas, -this.pivot.x, -this.pivot.y);
        
        super.draw();
    }

    private redraw():void
    {
        let ctx = this._targetContext;
        ctx.clearRect(0, 0, this._width, this._height);
        ctx.globalAlpha = 1;
        ctx.imageSmoothingEnabled = this.smoothing;
        ctx.globalCompositeOperation = this.blendMode;

        ctx.drawImage(this.graphics.canvas, 0, 0, this._width, this._height);
        
        if(this._image.src != "" || this._image.src != null)
        {
            ctx.drawImage(this._image, 0, 0, this._width, this._height);
        }

        if(this._tint != null)
        {
            ctx.globalAlpha = 1;

            ctx.globalCompositeOperation = BlendMode.SOURCE_ATOP;
            ctx.fillStyle = this._tint.toHexRGBA();
            ctx.fillRect(0, 0, this._width, this._height);
        }

        if(this._mask.src != "" || this._mask.src != null)
        {
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = BlendMode.DESTINATION_IN;
            ctx.drawImage(this._mask, 0, 0, this._width, this._height);
        }

        this._isDirty = false;
    }

    public set mask(value:string)
    {
        this._mask.src = value;
    }

    public set image(value:string)
    {
        this._image.src = value;
    }
    
    public get tint():Color
    {
        return this._tint;
    }

    public set tint(value:Color)
    {
        this._tint = value;
        this._isDirty = true;
    }

    public get width():number
    {
        return this._width;
    }

    public set width(value:number)
    {
        this._width = value;
        this._isDirty = true;
    }

    public get height():number
    {
        return this._height;
    }

    public set height(value:number)
    {
        this._height = value;
        this._isDirty = true;
    }

    public set anchor(value:AnchorType)
    {
        let width:number = this._width;
        let height:number = this._height;
        let halfWidth:number = this._width / 2;
        let halfHeight:number = this._height / 2;

        switch(value)
        {
            case AnchorType.TOP_LEFT:
                this.pivot.set(0, 0);
            break;
            case AnchorType.TOP_CENTER:
                this.pivot.set(halfWidth, 0);
            break;
            case AnchorType.TOP_RIGHT:
                this.pivot.set(width, 0);
            break;
            case AnchorType.CENTER_LEFT:
                this.pivot.set(0, halfHeight);
            break;
            case AnchorType.CENTER:
                this.pivot.set(halfWidth, halfHeight);
            break;
            case AnchorType.CENTER_RIGHT:
                this.pivot.set(width, halfHeight);
            break;
            case AnchorType.BOTTOM_LEFT:
                this.pivot.set(0, height);
            break;
            case AnchorType.BOTTOM_CENTER:
                this.pivot.set(halfWidth, height);
            break;
            case AnchorType.BOTTOM_RIGHT:
                this.pivot.set(width, height);
            break;
        }
    }
}