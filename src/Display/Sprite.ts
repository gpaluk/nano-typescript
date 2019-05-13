import { BlendMode } from "./BlendMode";
import { Point } from "Geom/Point";
import { Container } from "./Container";
import { Matrix } from "Geom/Matrix";
import { Stage } from "./Stage";

export class Sprite extends Container
{
    public alpha:number = 1;
    public smoothing:boolean = true;
    public blendMode:BlendMode = BlendMode.SOURCE_OVER;

    public pivot:Point = Point.ZERO;

    public image:HTMLImageElement;
    public canvas:HTMLCanvasElement;
    public graphics:CanvasRenderingContext2D;

    constructor()
    {
        super();

        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.graphics = this.canvas.getContext('2d');
        this.image = document.createElement('img') as HTMLImageElement;
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

        if(this.image)
        {
            let m:Matrix = this.worldTransform.matrix;
            let c: CanvasRenderingContext2D = Stage.context;

            //console.log(m.toString());
            
            c.globalAlpha = this.alpha;
            c.imageSmoothingEnabled = this.smoothing;
            c.globalCompositeOperation = this.blendMode;

            c.transform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12);
            c.drawImage(this.canvas, -this.pivot.x, -this.pivot.y);
        }

        super.draw();
    }
}