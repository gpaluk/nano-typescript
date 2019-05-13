export class Color
{
    private _red:number;
    private _green:number;
    private _blue:number;
    private _alpha:number;

    constructor(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1)
    {
        this._red = red;
        this._green = green;
        this._blue = blue;
        this._alpha = alpha;
    }

    public get red():number
    {
        return this._red;
    }

    public get green():number
    {
        return this._green;
    }

    public get blue():number
    {
        return this._blue;
    }

    public get alpha():number
    {
        return this._alpha;
    }

    public static get RED():Color
    {
        return new Color(1, 0, 0, 1);
    }

    public toHexRGB():string
    {
        let red: number = Math.floor(this._red * 255);
        let green: number = Math.floor(this._green * 255);
        let blue: number = Math.floor(this._blue * 255);

        return "#" + red.toString(16).padStart(2, '0') +
                     green.toString(16).padStart(2, '0') +
                     blue.toString(16).padStart(2, '0');
    }
}