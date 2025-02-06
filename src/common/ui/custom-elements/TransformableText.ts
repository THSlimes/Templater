import TransformableString from "./TransformableString";

export default class TransformableText extends TransformableString {

    public override get displayString(): string {
        return super.displayString;
    }

    public override set displayString(newVal: string) {
        super.displayString = newVal;
    }

    protected override initElement(): void | Promise<void> {
        super.initElement();

        return new Promise(resolve => requestAnimationFrame(() => {
            let text = "";
            for (const n of Array.from(this.childNodes)) {
                if (n instanceof Text) {
                    text += n.textContent ?? "";
                    n.remove();
                }
            }

            this.displayString = text;

            resolve();

        }));
    }

}

customElements.define("transformable-text", TransformableText);