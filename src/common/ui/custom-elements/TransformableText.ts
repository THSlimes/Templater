import ElementFactory from "../../element-factory/ElementFactory";
import MissingAttributeError from "../../error-handling/MissingAttributeError";
import MissingElementError from "../../error-handling/MissingElementError";
import TypeChecker, { getEnumChecker } from "../../run-time-type-checking/TypeChecker";
import Color from "../Color";
import Transformable from "./Transformable";

const EF = ElementFactory.INSTANCE;

class TransformableText extends Transformable {

    private paragraphElement?: HTMLParagraphElement;

    public get text(): string {
        if (!this.paragraphElement) throw new MissingElementError("missing <p> element");
        return this.paragraphElement.innerText;
    }

    public set text(newVal: string) {
        if (!this.paragraphElement) throw new MissingElementError("missing <p> element");
        this.paragraphElement.innerText = newVal;
    }


    public get color(): Color {
        if (!this.hasAttribute("color")) throw new MissingAttributeError("color");
        return Color.fromHex(this.getAttribute("color")!);
    }


    public set color(newVal: Color) {
        this.setAttribute("color", newVal.toHex());
        this.refreshCSSVars();
    }


    public get styles(): Set<TransformableText.Style> {
        const out = new Set<TransformableText.Style>();

        for (const style of TransformableText.ALL_STYLES) {
            if (this.classList.contains(style)) out.add(style);
        }

        return out;
    }

    public set styles(newVal: Set<TransformableText.Style>) {
        for (const style of TransformableText.ALL_STYLES) {
            this.classList.toggle(style, newVal.has(style));
        }
    }


    public get fontFamily(): TransformableText.FontFamily {
        if (!this.hasAttribute("font-family")) return TransformableText.FontFamily.SANS_SERIF;
        else return TransformableText.castToFontFamily(this.getAttribute("font-family"));
    }

    public set fontFamily(newVal: TransformableText.FontFamily) {
        this.setAttribute("font-family", newVal);
    }


    public get alignment(): TransformableText.Alignment {
        if (!this.hasAttribute("alignment")) return TransformableText.Alignment.LEFT;
        else return TransformableText.castToAlignment(this.getAttribute("alignment"));
    }

    public set alignment(newVal: TransformableText.Alignment) {
        this.setAttribute("alignment", newVal);
    }


    protected override initElement(): void | Promise<void> {
        return new Promise(resolve => requestAnimationFrame(() => {
            const text = this.innerText;
            this.innerText = "";

            this.paragraphElement = this.appendChild(
                EF.p({}, text)
                    .classes("text")
                    .make()
            );

            super.initElement();
            resolve();

            console.log(this.styles);

        }));

    }

    protected override refreshCSSVars(): void {
        this.style.setProperty("--text-fill-color", this.color.toHex());
        this.style.setProperty("--text-font-family", this.fontFamily);
        this.style.setProperty("--text-alignment", this.alignment);
        super.refreshCSSVars();
    }

}

namespace TransformableText {

    export enum Style {
        BOLD = "bold",
        ITALIC = "italic",
        UNDERLINE = "underline",
        STRIKETHROUGH = "strikethrough"
    }

    export const ALL_STYLES = Object.values(Style);

    export const castToStyle = TypeChecker.cast(getEnumChecker(Style), "TransformableText.Style");


    export enum FontFamily {
        SERIF = "serif",
        SANS_SERIF = "sans-serif",
        MONOSPACE = "monospace",
        CURSIVE = "cursive",
        FANTASY = "fantasy"
    }

    export const castToFontFamily = TypeChecker.cast(getEnumChecker(FontFamily), "TransformableText.FontFamily");


    export enum Alignment {
        LEFT = "left",
        CENTER = "center",
        RIGHT = "right",
        JUSTIFY = "justify"
    }

    export const castToAlignment = TypeChecker.cast(getEnumChecker(Alignment), "TransformableText.Alignment");

}

export default TransformableText;

customElements.define("transformable-text", TransformableText);