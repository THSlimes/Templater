import ElementFactory from "../../element-factory/ElementFactory";
import MissingElementError from "../../error-handling/MissingElementError";
import Color from "../Color";
import CustomElement, { SyncStateWithAttr } from "./CustomElement";
import { SyncStateSetWithAttr, SyncValueWithAttr } from "./CustomElement";
import Transformable from "./Transformable";

const EF = ElementFactory.INSTANCE;


export enum TextStyle {
    BOLD = "bold",
    ITALIC = "italic",
    UNDERLINE = "underline",
    STRIKETHROUGH = "strikethrough"
}

export enum FontFamily {
    SERIF = "serif",
    SANS_SERIF = "sans-serif",
    MONOSPACE = "monospace",
    CURSIVE = "cursive",
    FANTASY = "fantasy"
}

export enum TextAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    JUSTIFY = "justify"
}


export default abstract class TransformableString extends Transformable {

    static {
        CustomElement.loadStylesheet("transformable-string");
    }



    private paragraphElement?: HTMLParagraphElement;

    protected get displayString(): string {
        if (!this.paragraphElement) throw new MissingElementError("missing <p> element");
        return this.paragraphElement.textContent ?? "";
    }

    protected set displayString(newVal: string) {
        if (!this.paragraphElement) throw new MissingElementError("missing <p> element");
        this.paragraphElement.textContent = newVal;
    }

    @SyncValueWithAttr("color", Color) public color: Color = Color.TRANSPARENT;
    @SyncStateSetWithAttr("styles", TextStyle) public styles: Set<TextStyle> = new Set();
    @SyncStateWithAttr("font-family", FontFamily) public fontFamily: FontFamily = FontFamily.SANS_SERIF;
    @SyncStateWithAttr("alignment", TextAlignment) public alignment: TextAlignment = TextAlignment.LEFT;
    @SyncValueWithAttr("font-size", { fromString: Number.parseFloat }) public fontSize = 1;


    protected override initElement(): void | Promise<void> {
        super.initElement();

        this.toggleAttribute("transformable-string", true);

        this.paragraphElement = this.appendChild(
            EF.p({}, "")
                .classes("text")
                .make()
        );

        this.onAttributeChanged(["color", "font-family", "alignment", "font-size"], () => this.refreshCSSVars());
    }

    protected override refreshCSSVars(): void {
        this.style.setProperty("--text-fill-color", this.color.toString());
        this.style.setProperty("--text-font-family", this.fontFamily);
        this.style.setProperty("--text-font-size", this.fontSize + "em");
        this.style.setProperty("--text-alignment", this.alignment);
        super.refreshCSSVars();
    }

}