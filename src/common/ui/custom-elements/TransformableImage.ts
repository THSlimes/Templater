import ElementFactory from "../../element-factory/ElementFactory";
import { SyncStateWithAttr, SyncWithAttr } from "./CustomElement";
import Transformable from "./Transformable";

const EF = ElementFactory.INSTANCE;

/**
 * A Fit describes how the image is resized when the aspect ratio does not match
 * that of its container.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 */
export enum ImageFit {
    CONTAIN = "contain",
    COVER = "cover",
    FILL = "fill",
    SCALE_DOWN = "scale-down"
}

export default class TransformableImage extends Transformable {

    private static readonly DEFAULT_SRC = "/images/placeholder.svg";



    @SyncWithAttr("src") public src:string|null = null;
    @SyncStateWithAttr("fit", ImageFit) public fit:ImageFit = ImageFit.FILL;


    protected override initElement(): void | Promise<void> {

        const imageElement = this.appendChild(
            EF.img({}, this.src ?? TransformableImage.DEFAULT_SRC)
                .make()
        );

        this.onAttributeChanged("src", () => imageElement.src = this.src ?? TransformableImage.DEFAULT_SRC);
        this.onAttributeChanged("fit", () => imageElement.style.objectFit = this.fit);

        super.initElement();
    }

}

customElements.define("transformable-image", TransformableImage);