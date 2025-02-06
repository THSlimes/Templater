export default class Color {

    public static readonly TRANSPARENT = new Color(0, 0, 0, 0);
    public static readonly BLACK = new Color(0, 0, 0);
    public static readonly WHITE = new Color(255, 255, 255);

    public static readonly RED = new Color(255, 0, 0);
    public static readonly GREEN = new Color(0, 255, 0);
    public static readonly BLUE = new Color(0, 0, 255);



    public readonly r: number;
    public readonly g: number;
    public readonly b: number;
    public readonly a: number;

    public constructor(r: number, b: number, g: number, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public toString(): string {
        const comps = this.a == 255 ?
            [this.r, this.g, this.b] :
            [this.r, this.g, this.b, this.a];

        return '#' + comps.map(c => c.toString(16).padStart(2, '0')).join("").toUpperCase();
    }



    public static fromString(hexStr: string): Color {
        if (!hexStr.startsWith('#')) throw new SyntaxError("hex color string does not start with a '#'");

        hexStr = hexStr.substring(1);
        if (hexStr.length % 2 != 0 || hexStr.length < 6 || hexStr.length > 8) {
            throw new SyntaxError("incorrect number of encoding characters: " + hexStr.length);
        }

        return new Color(
            Number.parseInt(hexStr.substring(0, 2), 16),
            Number.parseInt(hexStr.substring(2, 4), 16),
            Number.parseInt(hexStr.substring(4, 6), 16),
            Number.parseInt(hexStr.substring(6, 8) || "FF", 16),
        );
    }

}