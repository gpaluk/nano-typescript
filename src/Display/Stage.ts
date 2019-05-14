import { Color } from "./Color";
import { Container } from "./Container";
import { Timer } from "Utils/Timer";

export class Stage
{
    private static _instance: Stage;

    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    
    private _clearColor:Color = new Color(0.3, 0.6, 0.9);
    private _framerate:number = 30;
    private _debug:boolean = false;;

    private _lastUpdate:number = 0;
    private _accumulator:number = 0;
    private _updateInterval:number = 0;

    private _isPaused:boolean;
    private _isFocussed:boolean;

    private _root:Container;

    public static init(width:number, height:number, clearColor:Color = null, framerate:number = 30, debug:boolean = false):Stage
    {
        if(this._instance == null)
        {
            this._instance = new Stage();
        }

        let instance = this._instance;

        clearColor == null ? instance._clearColor = new Color(0.3, 0.6, 0.9, 1) 
                           : instance._clearColor = clearColor;
        instance.framerate = framerate;
        instance._debug = debug;

        instance._canvas = document.createElement('canvas');
        instance._context = instance._canvas.getContext("2d");
        instance._canvas.width = width;
        instance._canvas.height = height;

        instance._root = new Container();
        instance._root.name = "__root";

        // testing
        document.body.appendChild(instance._canvas);

        instance.clear();
        instance._lastUpdate = Date.now();
        instance.addEventListeners();
        instance.updateAnimationFrame();

        return instance;
    }

    public static get context():CanvasRenderingContext2D
    {
        return Stage._instance._context;
    }

    public play():void
    {
        this._lastUpdate = Date.now();
        this._isPaused = false;
    }

    public pause():void
    {
        this._isPaused = true;
    }

    private addEventListeners():void
    {
        let canvas = this.instance._canvas;

        canvas.onclick = this.instance._onClick;
        canvas.onmousedown = this.instance._onMouseDown;
        canvas.onmouseup = this.instance._onMouseUp;
        canvas.onmousemove = this.instance._onMouseMove;
        canvas.ontouchstart = this.instance._onTouchStart;
        canvas.ontouchend = this.instance._onTouchEnd;
        
        window.onblur = this.instance._onBlur;
        window.onfocus = this.instance._onFocus;
    }

    private _onTouchStart(e:TouchEvent):void
    {
        console.log("TouchStart");
    }

    private _onTouchEnd(e:TouchEvent):void
    {
        console.log("TouchEnd");
    }

    private _onClick(e:MouseEvent):void
    {
        console.log("Click");
    }

    private _onMouseDown(e:MouseEvent):void
    {
        console.log("MouseDown");
    }

    private _onMouseUp(e:MouseEvent):void
    {
        console.log("MouseUp");
    }

    private _onMouseMove(e:MouseEvent):void
    {
        console.log("MouseMove");
    }

    private _onBlur(e:Event):void
    {
        console.log(e.target);
        if(!this._isPaused)
        {
            this._isFocussed = false;
            Stage._instance.pause();
        }
    }

    private _onFocus(e:Event):void
    {
        console.log(e.target);
        if(!this._isFocussed)
        {
            this._isFocussed = true;
            Stage._instance.play();
        }
    }

    public get instance():Stage
    {
        return Stage._instance;
    }

    public domElement():CanvasRenderingContext2D
    {
        return this._context;
    }

    public get framerate():number
    {
        return this._framerate;
    }

    public get root():Container
    {
        return this._root;
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
        let instance = Stage._instance;

        window.requestAnimationFrame(instance.updateAnimationFrame);

        if(!instance._isPaused)
        {
            let currentTime:number = Date.now();
            let delta = (currentTime - instance._lastUpdate) / 1000;

            Timer.deltaSeconds = delta;

            instance._accumulator += delta;
            while(instance._accumulator >= instance._updateInterval)
            {
                instance.update(delta);
                instance._accumulator -= instance._updateInterval;
            }
            instance._lastUpdate = currentTime;
        }
    }

    public update(applicationTime:number):void
    {
        let instance = Stage._instance;

        instance.resetCanvasState();
        instance.clear();

        // TODO update tweener
        instance._root.update(true);
        instance._root.draw();

        if(instance._debug)
        {
            instance._root.drawDebug();
        }

        // TODO onEnterFrame;
    }

    private resetCanvasState():void
    {
        this._context.resetTransform();
        this._context.globalAlpha = 1;
        this._context.imageSmoothingEnabled = true;
        this._context.globalCompositeOperation = 'source-over';
    }

    public clear():void
    {
        this._context.fillStyle = this._clearColor.toHexRGB();
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
}