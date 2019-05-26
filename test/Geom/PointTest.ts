import {Point} from '../../src/Geom/Point'

describe('Point', (): void => {
    it("should have an x value of 0'", (): void => {
        let point: Point = new Point()
        expect(point.x).toEqual(0)
    })
})

describe('Point', (): void => {
    it("should have an y value of 0'", (): void => {
        let point: Point = new Point()
        expect(point.y).toEqual(0)
    })
})
