import {Point} from './Point'

export class Matrix {
    public static get IDENTITY(): Matrix {
        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1)
    }

    public static get ZERO(): Matrix {
        return new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0)
    }

    public m00: number
    public m01: number
    public m02: number

    public m10: number
    public m11: number
    public m12: number

    public m20: number
    public m21: number
    public m22: number

    constructor(
        m00: number = 1,
        m01: number = 0,
        m02: number = 0,
        m10: number = 0,
        m11: number = 1,
        m12: number = 0,
        m20: number = 0,
        m21: number = 0,
        m22: number = 1
    ) {
        this.m00 = m00
        this.m01 = m01
        this.m02 = m02

        this.m10 = m10
        this.m11 = m11
        this.m12 = m12

        this.m20 = m20
        this.m21 = m21
        this.m22 = m22
    }

    public get euler(): number {
        return Math.atan2(-this.m01, this.m00)
    }

    public static rotation(radians: number): Matrix {
        let c = Math.cos(radians)
        let s = Math.sin(radians)

        return new Matrix(c, -s, 0, s, c, 0, 0, 0, 1)
    }

    public static scale(scaleX: number, scaleY: number): Matrix {
        return new Matrix(scaleX, 0, 0, 0, scaleY, 0, 0, 0, 1)
    }

    public static translation(x: number, y: number): Matrix {
        return new Matrix(1, 0, x, 0, 1, y, 0, 0, 1)
    }

    public static multiply(lhs: Matrix, rhs: Matrix): Matrix {
        return new Matrix(
            lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20,
            lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21,
            lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22,

            lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20,
            lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21,
            lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22,

            lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20,
            lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21,
            lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22
        )
    }

    public compose(scale: Point, rotation: Matrix, translation: Point) {
        let sMat: Matrix = Matrix.scale(scale.x, scale.y)
        let rMat: Matrix = Matrix.multiply(sMat, rotation)

        this.set(
            rMat.m00,
            rMat.m01,
            translation.x,
            rMat.m10,
            rMat.m11,
            translation.y,
            0,
            0,
            1
        )
    }

    public decompose(scale: Point, rotation: Matrix, translation: Point) {
        translation.set(this.m02, this.m12)

        let sx: number = Math.sqrt(this.m00 * this.m00 + this.m01 * this.m01)
        let sy: number = Math.sqrt(this.m10 * this.m10 + this.m11 * this.m11)
        scale.set(sx, sy)

        rotation.set(
            this.m00 / sx,
            this.m01 / sx,
            0,
            this.m10 / sy,
            this.m11 / sy,
            0,
            0,
            0,
            1
        )
    }

    public set(
        m00: number,
        m01: number,
        m02: number,
        m10: number,
        m11: number,
        m12: number,
        m20: number,
        m21: number,
        m22: number
    ) {
        this.m00 = m00
        this.m01 = m01
        this.m02 = m02

        this.m10 = m10
        this.m11 = m11
        this.m12 = m12

        this.m20 = m20
        this.m21 = m21
        this.m22 = m22
    }

    public copyFrom(m: Matrix): void {
        this.m00 = m.m00
        this.m01 = m.m01
        this.m02 = m.m02

        this.m10 = m.m10
        this.m11 = m.m11
        this.m12 = m.m12

        this.m20 = m.m20
        this.m21 = m.m21
        this.m22 = m.m22
    }

    public toIdentity(): void {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1)
    }

    public toZero(): void {
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0)
    }

    public toString(): string {
        return (
            `[Matrix]\n` +
            ` m00: ${this.m00.toPrecision(8)}, m01: ${this.m01.toPrecision(
                8
            )}, m02: ${this.m02.toPrecision(8)}\n` +
            ` m10: ${this.m10.toPrecision(8)}, m11: ${this.m11.toPrecision(
                8
            )}, m12: ${this.m12.toPrecision(8)}\n` +
            ` m20: ${this.m20.toPrecision(8)}, m21: ${this.m21.toPrecision(
                8
            )}, m22: ${this.m22.toPrecision(8)}`
        )
    }
}
