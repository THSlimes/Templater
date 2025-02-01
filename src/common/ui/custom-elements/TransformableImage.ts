import ElementFactory from "../../element-factory/ElementFactory";
import TypeChecker, { getEnumChecker } from "../../run-time-type-checking/TypeChecker";
import Transformable from "./Transformable";

const EF = ElementFactory.INSTANCE;

class TransformableImage extends Transformable {

    private static readonly DEFAULT_SRC = "/images/placeholder.svg";



    public get src(): string | null {
        return this.getAttribute("src");
    }

    public set src(newVal: string | null) {
        if (newVal) this.setAttribute("src", newVal);
        else this.removeAttribute("src");
    }

    public get fit(): TransformableImage.Fit {
        return TransformableImage.castToFit(this.getAttribute("fit"));
    }

    public set fit(newVal: TransformableImage.Fit) {
        this.setAttribute("fit", newVal);
    }


    protected override initElement(): void | Promise<void> {
        if (!this.hasAttribute("fit")) this.fit = TransformableImage.Fit.FILL; // assign default fitting

        const imageElement = this.appendChild(
            EF.img({}, this.src ?? TransformableImage.DEFAULT_SRC)
                .make()
        );

        this.onAttributeChanged("src", () => imageElement.src = this.src ?? TransformableImage.DEFAULT_SRC);
        this.onAttributeChanged("fit", () => imageElement.style.objectFit = this.fit);

        super.initElement();
    }

}

namespace TransformableImage {

    /**
     * A Fit describes how the image is resized when the aspect ratio does not match
     * that of its container.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
     */
    export enum Fit {
        CONTAIN = "contain",
        COVER = "cover",
        FILL = "fill",
        SCALE_DOWN = "scale-down"
    }

    export const castToFit = TypeChecker.cast(getEnumChecker(Fit), "TransformableImage.Fit");

}

export default TransformableImage;

customElements.define("transformable-image", TransformableImage);