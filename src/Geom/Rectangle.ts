import {Point} from './Point'
import {Transform} from './Transform'

export class Rectangle {
    public x: number
    public y: number
    public width: number
    public height: number

    public constructor(
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0
    ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    public dispose(): void {}

    public get position(): Point {
        return new Point(this.x, this.y)
    }

    public set position(value: Point) {
        this.x = value.x
        this.y = value.y
    }

    public get size(): Point {
        return new Point(this.width, this.height)
    }

    public set size(value: Point) {
        this.width = value.x
        this.height = value.y
    }

    public set(x: number, y: number, width: number, height: number): void {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    public growToContain(rect: Rectangle): void {
        let xMin: number = Math.min(this.x, rect.x)
        let xMax: number = Math.max(this.x + this.width, rect.x + rect.width)
        let yMin: number = Math.min(this.y, rect.y)
        let yMax: number = Math.max(this.y + this.height, rect.y + rect.height)

        this.x = xMin
        this.y = yMin
        this.width = xMax - xMin
        this.height = yMax - yMin
    }

    /**
     * TODO [GJP]This method is currently a hack, needs writing properly,
     * probably at the same time as an entire fast physics system
     */
    public static transformBy(
        transform: Transform,
        bound: Rectangle
    ): Rectangle {
        let rectangle: Rectangle = new Rectangle(
            bound.x,
            bound.y,
            bound.width,
            bound.height
        )

        rectangle.x += transform.translation.x
        rectangle.y += transform.translation.y

        rectangle.width *= transform.scaleX
        rectangle.height *= transform.scaleY

        return rectangle
    }

    public hitTest(p: Point): boolean {
        if (p.x < this.x) {
            return false
        }
        if (p.y < this.y) {
            return false
        }
        if (p.x > this.x + this.width) {
            return false
        }
        if (p.y > this.y + this.height) {
            return false
        }

        return true
    }

    public get top(): number {
        return this.y
    }

    public set top(value: number) {
        this.y = value
    }

    public get left(): number {
        return this.x
    }

    public set left(value: number) {
        this.x = value
    }

    public get right(): number {
        return this.x + this.width
    }

    public set right(value: number) {
        this.x = value - this.width
    }

    public get bottom(): number {
        return this.y + this.height
    }

    public set bottom(value: number) {
        this.y = value - this.height
    }

    public get topLeft(): Point {
        return new Point(this.x, this.y)
    }

    public get topRight(): Point {
        return new Point(this.x + this.width, this.y)
    }

    public get bottomLeft(): Point {
        return new Point(this.x, this.y + this.height)
    }

    public get bottomRight(): Point {
        return new Point(this.x + this.width, this.y + this.height)
    }

    public fromPoints(points: Point[]): void {
        let xMin: number = Number.MAX_VALUE
        let xMax: number = -Number.MAX_VALUE
        let yMin: number = Number.MAX_VALUE
        let yMax: number = -Number.MAX_VALUE

        for (let v of points) {
            if (v.x < xMin) {
                xMin = v.x
            }
            if (v.y < yMin) {
                yMin = v.y
            }
            if (v.x > xMax) {
                xMax = v.x
            }
            if (v.y > yMax) {
                yMax = v.y
            }
        }

        this.x = xMin
        this.y = yMin
        this.width = xMax - xMin
        this.height = yMax - yMin
    }

    public toString(): string {
        return (
            '[Rectangle]\nX: ' +
            this.x.toFixed(5) +
            ', Y: ' +
            this.y.toFixed(5) +
            ', Width: ' +
            this.width.toFixed(5) +
            ', Height: ' +
            this.height.toFixed(5)
        )
    }
}
