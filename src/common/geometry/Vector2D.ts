import Dim2D from "./Dim2D";

/**
 * A Point2D represents a point in 2D space.
 */
export interface Point2D {
    /** x-coordinate */
    x: number,
    /** y=coordinate */
    y: number
}

/**
 * A Vector2D represents a vector (direction from the origin to a 2D point) in 2D space.
 */
class Vector2D implements Point2D {

    /** The zero */
    public static readonly ZERO = new Vector2D(0, 0);



    public readonly x: number;
    public readonly y: number;

    /**
     * Creates a new Vector2D.
     * @param x x-coordinate of endpoint
     * @param y y-coordinate of endpoint
     */
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }


    /**
     * Gives the element-wise sum with the given point.
     * @param other other point
     * @returns sum of `this` and `other`
     */
    public add(other: Point2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    /**
     * Gives the element-wise difference with the given point.
     * @param other other point
     * @returns difference of `this` and `other`
     */
    public sub(other: Point2D): Vector2D {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    /**
     * Gives the product with the given point.
     * @param other other point
     * @param kind kind of product (see https://en.wikipedia.org/wiki/Vector_multiplication)
     */
    public mult(other: Point2D, kind: Vector2D.VectorMultKind.DOT): number;
    public mult(other: Point2D, kind?: Vector2D.VectorMultKind.HADAMARD): Vector2D;
    public mult(other: Point2D, kind = Vector2D.VectorMultKind.HADAMARD): number | Vector2D {
        switch (kind) {
            case Vector2D.VectorMultKind.DOT:
                return this.x * other.x + this.y * other.y;
            case Vector2D.VectorMultKind.HADAMARD:
                return new Vector2D(this.x * other.x, this.y * other.y);
            default:
                throw new Error("invalid vector multiplication type: " + kind);
        }
    }

    public div(other: Point2D): Vector2D {
        return new Vector2D(this.x / other.x, this.y / other.y);
    }


    /**
     * Scales this vector by a scalar.
     * @param s scalar
     * @returns `this` scaled by `s`
     */
    public scale(s: number): Vector2D {
        return new Vector2D(this.x * s, this.y * s);
    }

    /**
     * Computes the magnitude (Euclidean distance from origin) of this vector.
     * @returns magnitude of `this`
     */
    public magnitude(): number {
        return Math.sqrt(this.mult(this, Vector2D.VectorMultKind.DOT));
    }


    public equals(other: Point2D) {
        return this.x === other.x && this.y === other.y;
    }

    public copy(): Vector2D {
        return new Vector2D(this.x, this.y);
    }



    public static fromPoint(p: Point2D) {
        return new Vector2D(p.x, p.y);
    }
}

namespace Vector2D {

    export enum VectorMultKind {
        /** Sum of element-wise products */
        DOT,
        /** Vector of element-wise products */
        HADAMARD
    }

}

export default Vector2D;