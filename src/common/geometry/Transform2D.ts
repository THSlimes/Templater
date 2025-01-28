import Bounds2D from "./Bounds2D";
import Dim2D from "./Dim2D";
import Vector2D from "./Vector2D";

export default class Transform2D extends Bounds2D {

    public rotation: number;

    public constructor(center: Vector2D, dim: Dim2D, rotation: number) {
        super(center, dim);

        this.rotation = rotation;
    }


    public override copy(): Transform2D {
        return new Transform2D(this.center, this.dim, this.rotation);
    }

}