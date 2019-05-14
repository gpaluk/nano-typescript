import { BlendMode } from "./BlendMode";
import { Point } from "Geom/Point";
import { Container } from "./Container";
import { Matrix } from "Geom/Matrix";
import { Stage } from "./Stage";
import { Color } from "./Color";

export class Sprite extends Container
{
    public alpha:number = 1;
    public smoothing:boolean = true;
    public blendMode:BlendMode = BlendMode.SOURCE_OVER;

    public pivot:Point = Point.ZERO;


    private _targetCanvas:HTMLCanvasElement;
    private _targetContext:CanvasRenderingContext2D;

    public image:HTMLImageElement;
    public canvas:HTMLCanvasElement;
    public graphics:CanvasRenderingContext2D;

    public tint:Color;
    public mask:HTMLImageElement;

    // TODO Dynamic allocation
    private _width:number = 100;
    private _height:number = 100;

    constructor()
    {
        super();

        this._targetCanvas = document.createElement('canvas') as HTMLCanvasElement;
        this._targetContext = this._targetCanvas.getContext('2d');

        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.graphics = this.canvas.getContext('2d');
        this.image = document.createElement('img');
        this.mask = document.createElement('img');
    }

    //override
    public update(initiator:boolean = true):void
    {
        // TODO update model space

        super.update(initiator);
    }

    // TODO add dirty flags to image elements
    // override
    public draw():void
    {
        if(this.alpha < Number.EPSILON)
        {
            return;
        }

        let ctx = this._targetContext;
        ctx.clearRect(0, 0, this._width, this._height);
        ctx.globalAlpha = 1;
        ctx.imageSmoothingEnabled = this.smoothing;
        ctx.globalCompositeOperation = this.blendMode;

        ctx.drawImage(this.graphics.canvas, 0, 0, this._width, this._height);
        
        if(this.image.src != "")
        {
            ctx.drawImage(this.image, 0, 0, this._width, this._height);
        }

        if(this.tint != null)
        {
            ctx.globalAlpha = 1;

            ctx.globalCompositeOperation = BlendMode.SOURCE_ATOP;
            ctx.fillStyle = this.tint.toHexRGBA();
            ctx.fillRect(0, 0, this._width, this._height);
        }

        if(this.mask.src != "")
        {
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = BlendMode.DESTINATION_IN;
            ctx.drawImage(this.mask, 0, 0, this._width, this._height);
        }
        
        let stageCtx = Stage.context;

        let m:Matrix = this.worldTransform.matrix;
        stageCtx.globalAlpha = this.alpha;
        stageCtx.imageSmoothingEnabled = this.smoothing;
        stageCtx.globalCompositeOperation = this.blendMode;
        stageCtx.transform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12);

        ctx.globalAlpha = this.alpha;
        stageCtx.drawImage(ctx.canvas, 0, 0);

        super.draw();
    }

    public get width():number
    {
        return this._width;
    }

    public get height():number
    {
        return this._height;
    }
}