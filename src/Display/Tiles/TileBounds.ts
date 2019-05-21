export enum TileBounds {
    NONE = 0x00,
    TOP = 0x01,
    RIGHT = 0x02,
    BOTTOM = 0x04,
    LEFT = 0x08,
    DIAGONAL_UP = 0x80,
    DIAGONAL_DOWN = 0x80 | TOP
}
