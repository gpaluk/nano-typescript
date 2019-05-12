import { Color } from "./Color";
import { Container } from "./Container";

export class Stage
{
    private static _instance: Stage;

    private _canvas:HTMLCanvasElement;
    private _canvasContext:CanvasRenderingContext2D;
    
    private _clearColor:Color;
    private _framerate:number;
    private _debug:boolean;

    private _lastUpdate:number;
    private _accumulator:number;
    private _updateInterval:number;

    private _isPaused:boolean;
    private _isCallbackFromBlur:boolean;

    private _root:Container;

    /*
    public event EventHandler OnEnterFrame;
    public event EventHandler<MouseEventArgs> OnMouseClick;
    public event EventHandler<MouseEventArgs> OnMouseDown;
    public event EventHandler<MouseEventArgs> OnMouseUp;
    public event EventHandler<MouseEventArgs> OnMouseMove;
    */

    public static init(width:number, height:number, clearColor:Color = null, framerate:number = 30, debug:boolean = false)
    {
        if(this._instance == null)
        {
            this._instance = new Stage();
        }

        this._instance._clearColor = clearColor;
        this._instance._framerate = framerate;
        this._instance._debug = debug;

        this._instance._canvas = document.createElement('canvas');
        this._instance._canvasContext = this._instance._canvas.getContext("2d") as CanvasRenderingContext2D;
        this._instance._canvas.width = width;
        this._instance._canvas.height = height;

        this._instance._root = new Container();
        this._instance._root.name = "__root";

        // testing
        document.body.appendChild(this._instance._canvas);

        this._instance.clear();
        this._instance._lastUpdate = new Date().getTime();
        this._instance.updateAnimationFrame();
    }

    public domElement():HTMLCanvasElement
    {
        return this._canvas;
    }

    public get framerate():number
    {
        return this._framerate;
    }

    public set framerate(value:number)
    {
        this._framerate = value;
        this._updateInterval = 1/this._framerate;
    }

    public get clearColor():Color
    {
        return this._clearColor;
    }

    public set clearColor(value:Color)
    {
        this._clearColor = value;
    }

    public updateAnimationFrame():void
    {
        window.requestAnimationFrame(this.updateAnimationFrame);

        if(!this._isPaused)
        {
            //TODO accumulator
        }
    }

    public update(applicationTime:number):void
    {
        this.resetCanvasState();
        this.clear();

        // update tweener
        this._root.update(applicationTime, true);

        this._root.draw();

        if(this._debug)
        {
            this._root.drawDebug();
        }

        // TODO onEnterFrame;
    }

    private resetCanvasState():void
    {
        this._canvasContext.resetTransform();
        this._canvasContext.globalAlpha = 1;
        this._canvasContext.imageSmoothingEnabled = true;
        this._canvasContext.globalCompositeOperation = 'source-over';
    }

    public clear():void
    {
        this._canvasContext.fillStyle = this._clearColor.toHexRGB();
        this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
}