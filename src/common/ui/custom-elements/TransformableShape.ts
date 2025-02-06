import ElementFactory from "../../element-factory/ElementFactory";
import Dim2D from "../../geometry/Dim2D";
import Color from "../Color";
import { SyncStateWithAttr, SyncValueWithAttr } from "./CustomElement";
import Transformable from "./Transformable";

const EF = ElementFactory.INSTANCE;


export enum Shape {
    SQUARE = "square",
    RECTANGLE = "rectangle",
    ROUNDED_RECTANGLE = "rounded-rectangle",

    CIRCLE = "circle",
    ELLIPSE = "ellipse",

    TRIANGLE = "triangle",
    RIGHT_TRIANGLE = "right-triangle"
}

class TransformableShape extends Transformable {

    @SyncStateWithAttr("type", Shape) public type: Shape = Shape.RECTANGLE;
    @SyncValueWithAttr("color", Color) public color: Color = Color.TRANSPARENT;


    protected override initElement(): void | Promise<void> {
        if (!this.hasAttribute("type")) this.type = Shape.SQUARE; // assign default type

        const shapeElement = this.appendChild(
            EF.div({}, undefined, "shape")
                .make()
        );

        this.onAttributeChanged("type", () => {
            const targetRatio = TransformableShape.WIDTH_HEIGHT_RATIOS[this.type];
            if (targetRatio === undefined) this.lockAspectRatio = false; // no fixed aspect ratio
            else { // apply fixed aspect ratio
                const widthBasedDim = new Dim2D(this.transform.dim.width, this.transform.dim.width / targetRatio);
                const heightBasedDim = new Dim2D(this.transform.dim.height * targetRatio, this.transform.dim.height);

                this.transform.dim = widthBasedDim.area <= heightBasedDim.area ? widthBasedDim : heightBasedDim;
                this.lockAspectRatio = true;

                this.refreshCSSVars();
            }
        }, true);

        this.onAttributeChanged("color", () => this.refreshCSSVars());

        super.initElement();
    }

    protected override refreshCSSVars(): void {
        super.refreshCSSVars();

        this.style.setProperty("--shape-fill-color", this.color.toString());
    }

}

namespace TransformableShape {

    export const WIDTH_HEIGHT_RATIOS: Readonly<Record<Shape, number | undefined>> = Object.freeze({
        [Shape.SQUARE]: 1,
        [Shape.RECTANGLE]: undefined,
        [Shape.ROUNDED_RECTANGLE]: undefined,

        [Shape.CIRCLE]: 1,
        [Shape.ELLIPSE]: undefined,

        [Shape.TRIANGLE]: undefined,
        [Shape.RIGHT_TRIANGLE]: undefined
    });

}

export default TransformableShape;

customElements.define("transformable-shape", TransformableShape);