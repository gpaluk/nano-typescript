export class Point {
    public static get ZERO(): Point {
        return new Point(0, 0)
    }

    public static get ONE(): Point {
        return new Point(1, 1)
    }

    public static get AXIS_X(): Point {
        return new Point(1, 0)
    }

    public static get AXIS_Y(): Point {
        return new Point(0, 1)
    }

    public x: number
    public y: number

    public constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    public dispose(): void {}

    public add(p: Point): void {
        this.x += p.x
        this.y += p.y
    }

    public subtract(p: Point): void {
        this.x -= p.x
        this.y -= p.y
    }

    public multiply(p: Point): void {
        this.x *= p.x
        this.y *= p.y
    }

    public divide(p: Point): void {
        this.x /= p.x
        this.y /= p.y
    }

    public scale(scalar: number): void {
        this.x *= scalar
        this.y *= scalar
    }

    public dot(p: Point): number {
        return this.x * p.x + this.y * p.y
    }

    public reflection(normal: Point): Point {
        let n = normal.clone()
        let t = this.clone()

        let dotN = t.dot(n)
        n.scale(dotN)
        n.scale(2)
        t.subtract(n)

        return t
    }

    public invert(): void {
        this.x *= -1
        this.y *= -1
    }

    public normalize(): void {
        if (length < Number.EPSILON) {
            this.x = 0
            this.y = 0
        } else {
            let invLength = 1 / length
            this.x *= invLength
            this.y *= invLength
        }
    }

    public squaredLength(): number {
        return this.x * this.x + this.y * this.y
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public set(x: number, y: number): void {
        this.x = x
        this.y = y
    }

    public clone(): Point {
        return new Point(this.x, this.y)
    }

    public get isZero(): boolean {
        return this.x == 0 && this.y == 0
    }

    public get isOne(): boolean {
        return this.x == 1 && this.y == 1
    }

    public toString(): string {
        return `[Point] (x:${this.x.toFixed(5)}, y:${this.y.toFixed(5)})`
    }
}
