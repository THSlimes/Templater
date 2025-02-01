import ElementFactory from "../../element-factory/ElementFactory";
import MissingAttributeError from "../../error-handling/MissingAttributeError";
import Dim2D from "../../geometry/Dim2D";
import TypeChecker, { getEnumChecker } from "../../run-time-type-checking/TypeChecker";
import Color from "../Color";
import Transformable from "./Transformable";

const EF = ElementFactory.INSTANCE;

class TransformableShape extends Transformable {

    public get type(): TransformableShape.Type {
        return TransformableShape.castToType(this.getAttribute("type"));
    }

    public set type(newVal: TransformableShape.Type) {
        this.setAttribute("type", newVal);
    }

    public get color(): Color {
        if (!this.hasAttribute("color")) throw new MissingAttributeError("color");
        return Color.fromHex(this.getAttribute("color")!);
    }

    public set color(newVal: Color) {
        this.setAttribute("color", newVal.toHex());
        this.refreshCSSVars();
    }


    protected override initElement(): void | Promise<void> {
        if (!this.hasAttribute("type")) this.type = TransformableShape.Type.SQUARE; // assign default type

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

        this.style.setProperty("--shape-fill-color", this.color.toHex());
    }

}

namespace TransformableShape {

    export enum Type {
        SQUARE = "square",
        RECTANGLE = "rectangle",
        ROUNDED_RECTANGLE = "rounded-rectangle",

        CIRCLE = "circle",
        ELLIPSE = "ellipse",

        TRIANGLE = "triangle",
        RIGHT_TRIANGLE = "right-triangle"
    }

    export const WIDTH_HEIGHT_RATIOS: Readonly<Record<Type, number | undefined>> = Object.freeze({
        [Type.SQUARE]: 1,
        [Type.RECTANGLE]: undefined,
        [Type.ROUNDED_RECTANGLE]: undefined,

        [Type.CIRCLE]: 1,
        [Type.ELLIPSE]: undefined,

        [Type.TRIANGLE]: undefined,
        [Type.RIGHT_TRIANGLE]: undefined
    });

    export const castToType = TypeChecker.cast(getEnumChecker(Type), "TransformableShape.type");

}

export default TransformableShape;

customElements.define("transformable-shape", TransformableShape);