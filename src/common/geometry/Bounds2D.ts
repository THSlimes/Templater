import MathUtil from "../util/MathUtil";
import Dim2D from "./Dim2D";
import Vector2D, { Point2D } from "./Vector2D";

export default class Bounds2D {

    public center: Vector2D;
    public dim: Dim2D;

    public constructor(center: Vector2D, dim: Dim2D) {
        this.center = center;
        this.dim = dim;
    }


    public get left(): number {
        return this.center.x - this.dim.width / 2;
    }

    public get right(): number {
        return this.center.x + this.dim.width / 2;
    }

    public get top(): number {
        return this.center.y - this.dim.height / 2;
    }

    public get bottom(): number {
        return this.center.y + this.dim.height / 2;
    }


    public contains(p: Point2D): boolean {
        return p.x >= this.left && p.x <= this.right
            && p.y >= this.top && p.y <= this.bottom;
    }

    public clamp(p: Point2D): Vector2D {
        return new Vector2D(
            MathUtil.clamp(p.x, this.left, this.right),
            MathUtil.clamp(p.y, this.top, this.bottom)
        );
    }


    public copy(): Bounds2D {
        return new Bounds2D(this.center.copy(), this.dim.copy());
    }



    public static fromElement(elem: Element) {
        const rect = elem.getBoundingClientRect();

        return new Bounds2D(
            new Vector2D(rect.x + rect.width / 2, rect.y + rect.height / 2),
            Dim2D.fromSize(rect)
        );
    }

}