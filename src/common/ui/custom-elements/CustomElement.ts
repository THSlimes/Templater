import MissingAttributeError from "../../error-handling/MissingAttributeError";
import TypeChecker, { getEnumChecker } from "../../run-time-type-checking/TypeChecker";
import { Enum } from "../../util/UtilTypes";


interface StringConverter<T> {
    fromString(str: string): T,
    toString?(val: T): string
}

/**
 * Class field annotation. When applied, the boolean's value is synced with the presence
 * an attribute on the HTMLElement.
 * @param attrName name of the attribute
 */
export function SyncPresence<C extends CustomElement>(attrName: string) {
    return (_: undefined, ctx: ClassFieldDecoratorContext<C, boolean>) => ctx.addInitializer(function () {
        Reflect.defineProperty(this, ctx.name, {
            configurable: false,
            get: () => this.hasAttribute(attrName),
            set: v => this.toggleAttribute(attrName, v)
        });
    });
}

export function SyncValueWithAttr<C extends CustomElement, T>(attrName: string, strConverter: StringConverter<T>, defaultValue?: T) {
    return (_: undefined, ctx: ClassFieldDecoratorContext<C, T>) => ctx.addInitializer(function () {
        const oldValue: T = Reflect.get(this, ctx.name) as T; // funky

        Reflect.defineProperty(this, ctx.name, {
            configurable: false,
            get: () => {
                const attrValue = this.getAttribute(attrName);
                if (defaultValue === undefined && attrValue === null) {
                    throw new MissingAttributeError(attrName);
                }
                else return attrValue === null ?
                    defaultValue :
                    strConverter.fromString(attrValue);
            },
            set: v => {
                if (v === null) this.removeAttribute(attrName);
                else this.setAttribute(attrName, (strConverter.toString ?? String)(v))
            }
        });

        this.onceInitialized()
            .then(() => {
                if (!this.hasAttribute(attrName)) {
                    if (oldValue === null) this.removeAttribute(attrName);
                    else this.setAttribute(attrName, String(oldValue));
                }
            });
    });
}

export function SyncWithAttr<C extends CustomElement>(attName: string) {
    return SyncValueWithAttr<C, string | null>(attName, { fromString: str => str }, null);
}

export function SyncStateWithAttr<C extends CustomElement, E extends Enum>(attrName: string, enumerator: E, defaultValue?: E[keyof E]) {
    const enumChecker = TypeChecker.cast(getEnumChecker(enumerator));

    return SyncValueWithAttr<C, E[keyof E]>(attrName, { fromString: enumChecker }, defaultValue);
}

export function SyncStateSetWithAttr<C extends CustomElement, E extends Enum>(attrName: string, enumerator: E) {
    const enumChecker = TypeChecker.cast(getEnumChecker(enumerator));

    return SyncValueWithAttr<C, Set<E[keyof E]>>(attrName, {
        fromString: str => new Set(str.split(' ').map(enumChecker)),
        toString: set => [...set.values()].join(' ')
    });
}



export enum InitState {
    PENDING,
    INITIALIZED,
    FAILED
}

abstract class CustomElement extends HTMLElement {

    /** Set of element names whose styles are loaded. */
    private static loadedTagNames = new Set<string>();

    protected static loadStylesheet(tagName: string): Promise<void> {
        if (this.loadedTagNames.has(tagName)) return Promise.resolve();
        else return new Promise((resolve, reject) => {
            const linkElem = document.createElement("link");
            linkElem.rel = "stylesheet";
            linkElem.addEventListener("load", () => resolve());
            linkElem.addEventListener("error", reject);
            linkElem.href = CustomElement.getStyleSheetHref(tagName);

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
                        .catch(() => console.warn(`Failed to load stylesheet for "${name}". Make sure to have a CSS stylesheet at ${this.getStyleSheetHref(name)}`))
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

    public onAttributeChanged(attrName: string, callback: (newVal: string | null, oldVal: string | null, self: this) => void, doInitialCall = false) {
        new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                    const newValue = this.getAttribute(attrName);
                    if (newValue !== mutation.oldValue) callback(newValue, mutation.oldValue, this);
                }
            }
        }).observe(this, { attributes: true, attributeOldValue: true, attributeFilter: [attrName] });

        if (doInitialCall) callback(this.getAttribute(attrName), null, this);
    }


    protected syncPropertyWithAttribute<K extends keyof this>(key: K, attrName: string, converter: CustomElement.AttrConverter<this[K]>, defaultValue?: this[K]) {
        Reflect.defineProperty(this, key, {
            get: () => {
                const attrVal = this.getAttribute(attrName);
                if (attrVal === null) { // attribute not present
                    if (defaultValue === undefined) throw new MissingAttributeError(attrName);
                    else return defaultValue;
                }
                else return converter.fromString(attrVal); // attribute present
            },
            set: val => {
                const attrVal = (converter.toString ?? String)(val);
                if (attrVal === null) this.removeAttribute(attrName);
                else this.setAttribute(attrName, attrVal);
            }
        });
    }



    /** RegExp for matching custom HTML tag names */
    private static readonly CUSTOM_TAG_NAME_REGEX = /^[a-z]+(-[a-z]+)*$/;
    /** Gives the stylesheet source URL based on a custom element's name */
    private static getStyleSheetHref(tagName: string): string {
        if (!this.CUSTOM_TAG_NAME_REGEX.test(tagName)) {
            throw new SyntaxError(`name "${tagName}" does not match ${this.CUSTOM_TAG_NAME_REGEX}`);
        }

        return `/styles/custom-elements/${tagName}.css`;
    }

}

namespace CustomElement {

    export interface AttrConverter<T> {
        fromString: (str: string) => T,
        toString?: (val: T) => string | null
    };

}

export default CustomElement;