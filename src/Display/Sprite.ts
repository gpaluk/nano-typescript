import { BlendMode } from './BlendMode'
import { Point } from 'Geom/Point'
import { Container } from './Container'
import { Matrix } from 'Geom/Matrix'
import { Stage } from './Stage'
import { Color } from './Color'
import { AnchorType } from './AnchorType'
import { Texture } from './Texture'
import { Bound } from './Bound'
import { Rectangle } from 'Geom/Rectangle'

export class Sprite extends Container {
    public alpha: number = 1
    public smoothing: boolean = true
    public blendMode: BlendMode = BlendMode.SOURCE_OVER

    public pivot: Point = Point.ZERO

    protected _modelBound: Bound = Bound.ZERO
    protected _targetCanvas: HTMLCanvasElement
    protected _targetContext: CanvasRenderingContext2D

    public canvas: HTMLCanvasElement
    public graphics: CanvasRenderingContext2D

    protected _tint: Color
    protected _texture: Texture
    protected _mask: HTMLImageElement

    // TODO Dynamic allocation
    private _width: number
    private _height: number

    protected _isDirty: boolean = true

    public get targetContext(): CanvasRenderingContext2D {
        return this._targetContext
    }

    public get targetCanvas(): HTMLCanvasElement {
        return this._targetCanvas
    }

    public constructor(texture?: Texture) {
        super()

        this._targetCanvas = document.createElement(
            'canvas'
        ) as HTMLCanvasElement
        this._targetContext = this._targetCanvas.getContext('2d')

        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.graphics = this.canvas.getContext('2d')

        if (texture) {
            this.texture = texture
        } else {
            let img: HTMLImageElement = document.createElement('img')
            img.width = 10
            img.height = 10
            this.texture = new Texture(img)
        }

        this._mask = document.createElement('img')
        this._mask.onload = (): void => {
            this._isDirty = true
        }
        this._mask.onerror = (): void => {
            this._mask.src = ''
        }
    }

    public dispose(): void {
        //this._modelBound.dispose()
    }

    public get texture(): Texture {
        return this._texture
    }

    public set texture(value: Texture) {
        //TODO [GJP] Tidy all this up
        this._texture = value

        this.resizeWidth(value.width)
        this.resizeHeight(value.height)
    }

    private resizeWidth(width: number): void {
        this._targetCanvas.width = width
        this.canvas.width = width
        this._width = width

        this._isDirty = true
    }

    private resizeHeight(height: number): void {
        this._targetCanvas.height = height
        this.canvas.height = height
        this._height = height

        this._isDirty = true
    }

    //override
    public update(initiator: boolean = true): void {
        // TODO update model space

        super.update(initiator)
    }

    //override
    public updateModelBound(): void {
        this._modelBound.set(
            -this.pivot.x,
            -this.pivot.y,
            this._targetCanvas.width,
            this._targetCanvas.height
        )
    }

    // override
    public updateWorldBound(): void {
        this._worldBound = Bound.transform(
            this._modelBound,
            this.worldTransform
        )
    }

    // override
    public draw(): void {
        if (this.alpha < Number.EPSILON) {
            return
        }

        if (this._isDirty) {
            this.redraw()
            this.updateModelSpace()
        }

        let context: CanvasRenderingContext2D = Stage.context
        let m: Matrix = this.worldTransform.matrix

        context.globalAlpha = this.alpha
        context.imageSmoothingEnabled = this.smoothing
        context.globalCompositeOperation = this.blendMode
        context.setTransform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12)

        let target: CanvasRenderingContext2D = this._targetContext
        target.globalAlpha = this.alpha
        context.drawImage(target.canvas, -this.pivot.x, -this.pivot.y)

        super.draw()
    }

    // override
    public drawDebug(): void {
        let c: CanvasRenderingContext2D = Stage.context

        c.globalCompositeOperation = BlendMode.SOURCE_OVER
        c.imageSmoothingEnabled = true
        c.globalAlpha = 1

        let m: Matrix = this.worldTransform.matrix
        c.setTransform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12)

        c.strokeStyle = '#0F0'
        c.lineWidth = 0.3
        c.strokeRect(
            this._modelBound.aabb.x,
            this._modelBound.aabb.y,
            this._modelBound.aabb.width,
            this._modelBound.aabb.height
        )

        c.resetTransform()
        c.strokeStyle = '#F00'
        c.lineWidth = 1
        c.strokeRect(
            this._worldBound.aabb.x,
            this._worldBound.aabb.y,
            this._worldBound.aabb.width,
            this._worldBound.aabb.height
        )

        super.drawDebug()
    }

    public redraw(): void {
        let ctx = this._targetContext
        ctx.clearRect(0, 0, this._width, this._height)
        ctx.globalAlpha = 1
        ctx.imageSmoothingEnabled = this.smoothing
        ctx.globalCompositeOperation = this.blendMode

        ctx.drawImage(this.graphics.canvas, 0, 0, this._width, this._height)

        if (this._texture.image.src != '' || this._texture.image.src != null) {
            ctx.drawImage(this._texture.image, 0, 0, this._width, this._height)
        }

        if (this._tint != null) {
            ctx.globalAlpha = 1

            ctx.globalCompositeOperation = BlendMode.SOURCE_ATOP
            ctx.fillStyle = this._tint.toHexRGBA()
            ctx.fillRect(0, 0, this._width, this._height)
        }

        if (this._mask.src != '' || this._mask.src != null) {
            ctx.globalAlpha = 1
            ctx.globalCompositeOperation = BlendMode.DESTINATION_IN
            ctx.drawImage(this._mask, 0, 0, this._width, this._height)
        }

        this._isDirty = false
    }

    public set mask(value: string) {
        this._mask.src = value
    }

    public get tint(): Color {
        return this._tint
    }

    public set tint(value: Color) {
        this._tint = value
        this._isDirty = true
    }

    public get width(): number {
        return this._worldBound.aabb.width
    }

    public set width(value: number) {
        this.resizeWidth(value)
        this.scaleX = value / this._targetCanvas.width
    }

    public get height(): number {
        return this._worldBound.aabb.height
    }

    public set height(value: number) {
        this.resizeHeight(value)
        this.scaleY = value / this._targetCanvas.height
    }

    public get left(): number {
        return this._worldBound.aabb.x
    }

    public get right(): number {
        return this.left + this.width
    }

    public get top(): number {
        return this._worldBound.aabb.y
    }

    public get bottom(): number {
        return this.top + this.height
    }

    public get center(): Point {
        return new Point(
            (this.left + this.width) / 2,
            (this.top + this.height) / 2
        )
    }

    public intersectsXY(x: number, y: number): boolean {
        if (this.bottom < y) {
            return false
        }

        if (this.top > y) {
            return false
        }

        if (this.right < x) {
            return false
        }

        if (this.left > x) {
            return false
        }

        return true
    }

    public intersectsPoint(point: Point): boolean {
        return this.intersectsXY(point.x, point.y)
    }

    /**
     * TODO [GJP] This is fast and dirty! Fix this up
     * by implementing a full physics system
     */
    public intersects(sprite: Sprite): boolean {
        if (this.bottom < sprite.top) {
            return false
        }

        if (this.top > sprite.bottom) {
            return false
        }

        if (this.right < sprite.left) {
            return false
        }

        if (this.left > sprite.right) {
            return false
        }

        return true
    }

    /**
     * TODO [GJP] This is fast and dirty! Fix this up
     * by implementing a full physics system
     */
    public intersectsRectangle(rect: Rectangle): boolean {
        if (this.bottom < rect.top) {
            return false
        }

        if (this.top > rect.bottom) {
            return false
        }

        if (this.right < rect.left) {
            return false
        }

        if (this.left > rect.right) {
            return false
        }
    }

    public intersectsRadiusAdvanced(
        sprite: Sprite,
        radius: number,
        radiusOther: number,
        tolerance: number
    ): boolean {
        let center1: Point = this.center
        let center2: Point = sprite.center
        let xdiff: number = center2.x - center1.x
        let ydiff: number = center2.y - center1.y
        let dCentreSq: number = ydiff * ydiff + xdiff * xdiff
        let rSumSq: number = radius + radiusOther
        rSumSq *= rSumSq

        return dCentreSq - rSumSq <= tolerance * tolerance
    }

    public intersectsRadius(sprite: Sprite, radius?: number): boolean {
        if (radius) {
            return this.intersectsRadiusAdvanced(sprite, radius, radius, 0)
        } else {
            return this.intersectsRadiusAdvanced(
                sprite,
                (this.width + this.height) / 4,
                (sprite.width + sprite.height) / 4,
                0
            )
        }
    }

    public set anchorType(value: AnchorType) {
        let width: number = this._width
        let height: number = this._height
        let halfWidth: number = this._width / 2
        let halfHeight: number = this._height / 2

        switch (value) {
            case AnchorType.TOP_LEFT:
                this.pivot.set(0, 0)
                break
            case AnchorType.TOP_CENTER:
                this.pivot.set(halfWidth, 0)
                break
            case AnchorType.TOP_RIGHT:
                this.pivot.set(width, 0)
                break
            case AnchorType.CENTER_LEFT:
                this.pivot.set(0, halfHeight)
                break
            case AnchorType.CENTER:
                this.pivot.set(halfWidth, halfHeight)
                break
            case AnchorType.CENTER_RIGHT:
                this.pivot.set(width, halfHeight)
                break
            case AnchorType.BOTTOM_LEFT:
                this.pivot.set(0, height)
                break
            case AnchorType.BOTTOM_CENTER:
                this.pivot.set(halfWidth, height)
                break
            case AnchorType.BOTTOM_RIGHT:
                this.pivot.set(width, height)
                break
        }
    }
}
