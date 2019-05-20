import {Stage} from './Stage'
import {EventType} from 'Events/EventType'
import {EventDispatcher} from 'Events/EventDispatcher'

export class Texture extends EventDispatcher {
    private _path: string
    private _canvas: HTMLCanvasElement
    private _context: CanvasRenderingContext2D
    private _image: HTMLImageElement

    constructor() {
        super()

        this._path = ''
        this._canvas = document.createElement('canvas')
        this._context = this._canvas.getContext('2d')
        this._image = document.createElement('img')
        this._image.onload = e => this.onImageLoad(e)
        this._image.onerror = e => this.onImageError(e)
    }

    public set path(value: string | null) {
        value == null ? (this._path = '') : (this._path = value)
        this._image.src = this._path
    }

    public get path() {
        return this._path
    }

    private onImageLoad(e: Event): void {
        this._canvas.width = this._image.width
        this._canvas.height = this._image.height
        this._context.drawImage(this._image, 0, 0)
        this.dispatchEvent(new Event(EventType.LOADED))
    }

    private onImageError(e: Event | string) {
        this._path = ''
        this.dispatchEvent(new CustomEvent(EventType.ERROR))
    }

    public draw(x: number, y: number): void {
        Stage.context.drawImage(this._canvas, x, y)
    }
}
