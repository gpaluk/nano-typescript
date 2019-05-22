import {Point} from './Point'
import {Matrix} from './Matrix'

export class Transform {
    public static get IDENTITY(): Transform {
        return new Transform()
    }

    private _scale: Point = Point.ONE
    private _rotation: Matrix = Matrix.IDENTITY
    private _translation: Point = Point.ZERO

    private _matrix: Matrix = Matrix.IDENTITY
    private _isDirty: boolean = true

    constructor() {}

    public dispose() {
        this._scale.dispose()
        this._rotation.dispose()
        this._translation.dispose()
        this._matrix.dispose()

        this._scale = null
        this._rotation = null
        this._translation = null
        this._matrix = null
    }

    public setScale(x: number, y: number): void {
        this._scale.x = x
        this._scale.y = y
        this._isDirty = true
    }

    public setTranslate(x: number, y: number): void {
        this._translation.x = x
        this._translation.y = y
        this._isDirty = true
    }

    public setRotate(radians: number): void {
        let c: number = Math.cos(radians)
        let s: number = Math.sin(radians)
        this._rotation.set(c, -s, 0, s, c, 0, 0, 0, 1)
        this._isDirty = true
    }

    public get scaleX(): number {
        return this._scale.x
    }

    public set scaleX(value: number) {
        this._scale.x = value
        this._isDirty = true
    }

    public get scaleY(): number {
        return this._scale.y
    }

    public set scaleY(value: number) {
        this._scale.y = value
        this._isDirty = true
    }

    public get scale(): Point {
        return this._scale
    }

    public set scale(value: Point) {
        this._scale = value
        this._isDirty = true
    }

    public get rotation(): Matrix {
        return this._rotation
    }

    public set rotation(value: Matrix) {
        this._rotation = value
        this._isDirty = true
    }

    public get translation(): Point {
        return this._translation
    }

    public set translation(value: Point) {
        this._translation = value
        this._isDirty = true
    }

    public static multiply(lhs: Transform, rhs: Transform): Transform {
        let m: Matrix = Matrix.multiply(lhs.matrix, rhs.matrix)
        let t: Transform = new Transform()
        t.matrix = m

        return t
    }

    public get matrix(): Matrix {
        if (this._isDirty) {
            this._matrix.compose(
                this._scale,
                this._rotation,
                this._translation
            )
            this._isDirty = false
        }
        return this._matrix
    }

    public set matrix(value: Matrix) {
        this._matrix = value
        this._matrix.decompose(this._scale, this._rotation, this._translation)
        this._isDirty = false
    }
}
