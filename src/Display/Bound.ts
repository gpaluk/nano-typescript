import {Transform} from 'Geom/Transform'
import {Point} from 'Geom/Point'

export class Bound {
    private _transform: Transform
    private _isAABBDirty: boolean

    private _vertices: Point[] = [
        Point.ZERO,
        Point.ZERO,
        Point.ZERO,
        Point.ZERO
    ]

    constructor(vertices: Point[]) {
        this._transform = Transform.IDENTITY
        this._vertices = vertices
        this._isAABBDirty = true
    }

    public static get IDENTITY(): Bound {
        let vertices: Point[] = [Point.ZERO, Point.ZERO, Point.ONE, Point.ONE]
        return new Bound(vertices)
    }
}
