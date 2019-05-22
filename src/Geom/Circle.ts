import {Point} from './Point'

export class Circle {
    public x: number
    public y: number
    public radius: number

    constructor(x: number = 0, y: number = 0, radius: number) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    public get position(): Point {
        return new Point(this.x, this.y)
    }

    public set position(value: Point) {
        this.x = value.x
        this.y = value.y
    }

    public get size(): number {
        return this.radius * 2
    }

    public set size(value: number) {
        this.radius = value / 2
    }

    public set(x: number, y: number, radius: number) {
        this.x = x
        this.y = y
        this.radius = radius
    }
}
