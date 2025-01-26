/** RegExp for matching custom HTML tag names */
const CUSTOM_TAG_NAME_REGEX = /^[a-z]+-[a-z]+$/;
/** Gives the stylesheet source URL based on a custom element's name */
function getStyleSheetHref(tagName: string): string {
    if (!CUSTOM_TAG_NAME_REGEX.test(tagName)) {
        throw new SyntaxError(`name "${tagName}" does not match ${CUSTOM_TAG_NAME_REGEX}`);
    }

    return `/styles/custom-elements/${tagName}.css`;
}



export default abstract class CustomElement extends HTMLElement {

    /** Set of element names whose styles are loaded. */
    private static loadedTagNames = new Set<string>();

    private static loadStylesheet(tagName: string): Promise<void> {
        if (this.loadedTagNames.has(tagName)) return Promise.resolve();
        else return new Promise((resolve, reject) => {
            const linkElem = document.createElement("link");
            linkElem.rel = "stylesheet";
            linkElem.addEventListener("load", () => resolve());
            linkElem.addEventListener("error", reject);
            linkElem.href = getStyleSheetHref(tagName);

            window.addEventListener("DOMContentLoaded", () => document.head.appendChild(linkElem));
        });
    }

    static { // wrap customElements.define to load stylesheet on custom tag definition
        const oldDefine = customElements.define.bind(customElements);
        customElements.define = (name, constructor, options) => {

            let prt: any = constructor;
            while (prt) {
                if (prt === this) { // only load CustomElement subclass styles
                    this.loadStylesheet(name)
                        .then(() => console.info(`Loaded stylesheet for "${name}"`)) // DEBUG
                        .catch(() => console.warn(`Failed to load stylesheet for "${name}". Make sure to have a CSS stylesheet at ${getStyleSheetHref(name)}`));
                    this.loadedTagNames.add(name); // don't load twice
                    break;
                }
                else prt = Object.getPrototypeOf(prt);
            }

            return oldDefine(name, constructor, options);
        }
    }



    public on<T extends keyof HTMLElementEventMap>(type: T, listener: (ev: HTMLElementEventMap[T], self: this) => void): this {
        this.addEventListener(type, ev => listener(ev, this));

        return this;
    }

    public once<T extends keyof HTMLElementEventMap>(type: T): Promise<[HTMLElementEventMap[T], this]> {
        return new Promise(resolve => {
            this.addEventListener(type, ev => resolve([ev, this]), { once: true });
        });
    }

}