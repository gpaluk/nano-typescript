import {Stage} from './Stage'
import {EventType} from 'Events/EventType'
import {EventDispatcher} from 'Events/EventDispatcher'

export class Texture extends EventDispatcher {
    private readonly _image: HTMLImageElement

    public get image() {
        return this._image
    }

    constructor(image: HTMLImageElement = null) {
        super()

        if (image) {
            this._image = image
        } else {
            this._image = document.createElement('img')
        }

        this._image.onload = e => this.onImageLoad(e)
        this._image.onerror = e => this.onImageError(e)
    }

    public get width() {
        return this._image.width
    }

    public get height() {
        return this._image.height
    }

    public set path(value: string | null) {
        if (value == null) {
            value = ''
        }
        this._image.src = value
    }

    public get path() {
        return this._image.src
    }

    private onImageLoad(e: Event): void {
        this.dispatchEvent(new Event(EventType.LOADED))
    }

    private onImageError(e: Event | string) {
        this._image.src = ''
        this.dispatchEvent(new CustomEvent(EventType.ERROR))
    }

    public draw(
        x: number,
        y: number,
        width?: number,
        height?: number,
        sX?: number,
        sY?: number,
        sWidth?: number,
        sHeight?: number
    ): void {
        if (sY && sX && sWidth && sHeight && width && height) {
            Stage.context.drawImage(
                this._image,
                sX,
                sY,
                sWidth,
                sHeight,
                x,
                y,
                width,
                height
            )
        } else if (width && height) {
            Stage.context.drawImage(this._image, x, y, width, height)
        } else {
            Stage.context.drawImage(this._image, x, y)
        }
    }
}
