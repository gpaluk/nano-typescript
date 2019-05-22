import {Transform} from 'Geom/Transform'
import {Point} from 'Geom/Point'
import {Matrix} from 'Geom/Matrix'
import {Rectangle} from 'Geom/Rectangle'

export class Bound {
    private _transform: Transform
    private _isAABBDirty: boolean
    private _aabb: Rectangle = new Rectangle()

    private _vertices: Point[] = [
        Point.ZERO,
        Point.ZERO,
        Point.ZERO,
        Point.ZERO
    ]

    public static get IDENTITY(): Bound {
        //TODO [GJP] Fix this up, clearly not a unit square but putting it here quickly
        let vertices: Point[] = [Point.ZERO, Point.ZERO, Point.ONE, Point.ONE]
        return new Bound(vertices)
    }

    public static get ZERO(): Bound {
        let vertices: Point[] = [Point.ZERO, Point.ZERO, Point.ZERO, Point.ZERO]
        return new Bound(vertices)
    }

    constructor(vertices: Point[]) {
        this._transform = Transform.IDENTITY
        this._vertices = vertices
        this._isAABBDirty = true
    }

    public dispose(): void {
        for (let point of this._vertices) {
            point.dispose()
            point = null
        }
        this._transform.dispose()
        this._transform = null
    }

    public static transform(bound: Bound, transform: Transform): Bound {
        let newVerts: Array<Point> = new Array<Point>(4)

        for (let i = 0; i < 4; ++i) {
            newVerts[i] = Matrix.multiplyPoint(
                transform.matrix,
                bound._vertices[i]
            )
        }

        return new Bound(newVerts)
    }

    public set(x: number, y: number, width: number, height: number): void {
        this._vertices[0].x = x
        this._vertices[0].y = y
        this._vertices[1].x = x + width
        this._vertices[1].y = y
        this._vertices[2].x = x + width
        this._vertices[2].y = y + height
        this._vertices[3].x = x
        this._vertices[3].y = y + height

        this._isAABBDirty = true
    }

    public get aabb(): Rectangle {
        if (!this._isAABBDirty) {
            return this._aabb
        }

        let minX: number = Number.MAX_VALUE
        let maxX: number = -Number.MAX_VALUE
        let minY: number = Number.MAX_VALUE
        let maxY: number = -Number.MAX_VALUE

        for (let i = 0; i < this._vertices.length; ++i) {
            if (this._vertices[i].x < minX) minX = this._vertices[i].x
            if (this._vertices[i].x > maxX) maxX = this._vertices[i].x
            if (this._vertices[i].y < minY) minY = this._vertices[i].y
            if (this._vertices[i].y > maxY) maxY = this._vertices[i].y
        }

        this._aabb.set(minX, minY, maxX - minX, maxY - minY)
        return this._aabb
    }
}
