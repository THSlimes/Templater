import Vector2D, { Point2D } from "./Vector2D";

/**
 * A Size2D represents the size of something in 2D space.
 */
export interface Size2D {
    width: number,
    height: number
}

/**
 * A Dim2D represents the dimensions of something in 2D space.
 */
export default class Dim2D implements Size2D {

    public readonly width: number;
    public readonly height: number;

    /**
     * Creates a new Dim2D object.
     * @param width
     * @param height
     */
    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }


    /**
     * Scales the dimensions by a scalar.
     * @param s scalar
     * @returns `this` scaled by `s`
     */
    public scale(s: number): Dim2D {
        return new Dim2D(this.width * s, this.height * s);
    }

    /**
     * Gives the element-wise product with the given dimensions
     * @param other other dimensions
     * @returns element-wise product of `this` and `other`
     */
    public mult(other: Dim2D): Dim2D {
        return new Dim2D(this.width * other.width, this.height * other.height);
    }

    /**
     * Gives the element-wise quotient with the given dimensions.
     * @param other other dimensions
     * @returns element-wise quotient of `this` and `other`
     */
    public div(other: Size2D): Dim2D {
        return new Dim2D(this.width / other.width, this.height / other.height);
    }


    public getCorner(): Vector2D {
        return new Vector2D(this.width, this.height);
    }

    public equals(other: Size2D) {
        return this.width === other.width
            && this.height === other.height;
    }

    public copy(): Dim2D {
        return new Dim2D(this.width, this.height);
    }



    public static fromSize(size: Size2D) {
        return new Dim2D(size.width, size.height);
    }

    public static fromCorner(corner: Point2D) {
        return new Dim2D(corner.x, corner.y);
    }

}