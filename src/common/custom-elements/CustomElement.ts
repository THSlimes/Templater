/** RegExp for matching custom HTML tag names */
const CUSTOM_TAG_NAME_REGEX = /^[a-z]+(-[a-z]+)*$/;
/** Gives the stylesheet source URL based on a custom element's name */
function getStyleSheetHref(tagName: string): string {
    if (!CUSTOM_TAG_NAME_REGEX.test(tagName)) {
        throw new SyntaxError(`name "${tagName}" does not match ${CUSTOM_TAG_NAME_REGEX}`);
    }

    return `/styles/custom-elements/${tagName}.css`;
}


export enum InitState {
    PENDING,
    INITIALIZED,
    FAILED
}

export default abstract class CustomElement extends HTMLElement {

    /** Set of element names whose styles are loaded. */
    private static loadedTagNames = new Set<string>();

    protected static loadStylesheet(tagName: string): Promise<void> {
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
                        .catch(() => console.warn(`Failed to load stylesheet for "${name}". Make sure to have a CSS stylesheet at ${getStyleSheetHref(name)}`))
                        .finally(() => this.loadedTagNames.add(name)); // don't load twice
                    break;
                }
                else prt = Object.getPrototypeOf(prt);
            }

            return oldDefine(name, constructor, options);
        }
    }


    private initState = InitState.PENDING;
    private initErr: any;
    private readonly initResolvers: Set<(elem: this) => void> = new Set();
    private readonly initRejectors: Set<(err?: any) => void> = new Set();

    public onceInitialized(): Promise<this> {
        const { promise, resolve, reject } = Promise.withResolvers<this>();

        switch (this.initState) {
            case InitState.PENDING:
                this.initResolvers.add(resolve);
                this.initRejectors.add(reject);
                break;
            case InitState.INITIALIZED:
                resolve(this);
                break;
            case InitState.FAILED:
                reject(this.initErr);
                break;
        }

        return promise;
    }

    connectedCallback() {
        const initPromise = this.initElement() ?? Promise.resolve();

        initPromise
            .then(() => {
                for (const resolve of this.initResolvers) resolve(this);

                this.initState = InitState.INITIALIZED;
            })
            .catch(err => {
                this.initErr = err;
                for (const reject of this.initRejectors) reject(this.initErr);

                this.initState = InitState.FAILED;
            })
            .finally(() => {
                this.initResolvers.clear();
                this.initRejectors.clear();
            });
    }

    protected initElement(): void | Promise<void> {
        console.warn("initElement method is not overridden for " + this.constructor.name);
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

    public onAttributeChanged(attrName: string, callback: (newVal: string | null, oldVal: string | null, self: this) => void) {
        new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    const newValue = this.getAttribute(attrName);
                    if (newValue !== mutation.oldValue) callback(newValue, mutation.oldValue, this);
                }
            }
        }).observe(this, { attributes: true, attributeOldValue: true, attributeFilter: [attrName] });
    }

}