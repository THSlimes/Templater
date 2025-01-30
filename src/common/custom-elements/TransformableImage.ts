import ElementFactory from "../element-factory/ElementFactory";
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


    protected override initElement(): void | Promise<void> {
        const imageElement = this.appendChild(
            EF.img({}, this.src ?? TransformableImage.DEFAULT_SRC)
                .make()
        );

        this.onAttributeChanged("src", newSrc => imageElement.src = newSrc ?? TransformableImage.DEFAULT_SRC);

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

}

export default TransformableImage;

customElements.define("transformable-image", TransformableImage);