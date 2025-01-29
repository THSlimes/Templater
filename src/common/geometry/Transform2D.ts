import Bounds2D from "./Bounds2D";
import Dim2D from "./Dim2D";
import Vector2D, { Point2D } from "./Vector2D";

export default class Transform2D extends Bounds2D {

    /** Rotation angle (measured in radians) */
    public rotation: number;

    public constructor(center: Vector2D, dim: Dim2D, rotation: number) {
        super(center, dim);

        this.rotation = rotation;
    }


    public override get topLeft(): Vector2D {
        return this.toGlobalSpace({ x: -.5, y: -.5 });
    }

    public override get topRight(): Vector2D {
        return this.toGlobalSpace({ x: .5, y: -.5 });
    }

    public override get bottomLeft(): Vector2D {
        return this.toGlobalSpace({ x: -.5, y: .5 });
    }

    public override get bottomRight(): Vector2D {
        return this.toGlobalSpace({ x: .5, y: .5 });
    }


    public toLocalSpace(p: Point2D): Vector2D {
        const pVector = Vector2D.fromPoint(p);

        return pVector.sub(this.center)
            .rotate(-this.rotation)
            .div(this.dim.getCorner());
    }

    public toGlobalSpace(p: Point2D): Vector2D {
        const pVector = Vector2D.fromPoint(p);

        return pVector.mult(this.dim.getCorner())
            .rotate(this.rotation)
            .add(this.center);
    }


    public override copy(): Transform2D {
        return new Transform2D(this.center.copy(), this.dim.copy(), this.rotation);
    }

}