import MissingAttributeError from "../../error-handling/MissingAttributeError";
import TypeChecker, { getEnumChecker, isString } from "../../run-time-type-checking/TypeChecker";


interface StringConverter<T> {
    fromString(str: string): T,
    toString(val: T): string
}

/**
 * Class field decorator. When applied, the boolean's value is synced with the presence
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

/**
 * Class field decorator. When applied, the field's value is synchronized with that of an attribute.
 * @param attrName name of the attribute
 * @param strConverter object that handles converting value from/to a string
 * @param defaultValue value to use when the attribute is not present. If omitted, the attribute must
 * be present on the element.
 */
export function SyncValueWithAttr<C extends CustomElement, T>(attrName: string, strConverter: StringConverter<T>, defaultValue?: T) {
    if (strConverter.toString === Object.prototype.toString || strConverter.toString === Object.toString) strConverter.toString = String; // never use default object.toString method

    return (_: undefined, ctx: ClassFieldDecoratorContext<C, T>) => ctx.addInitializer(function () {
        const oldValue = Reflect.get(this, ctx.name) as T; // funky

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
                else this.setAttribute(attrName, strConverter.toString(v))
            }
        });

        this.addEventListener("beforeinit", () => {
            if (!this.hasAttribute(attrName)) Reflect.set(this, ctx.name, oldValue);
        });
    });
}

/**
 * Class field decorator. Synchronizes the value of a nullable string with
 * that of an element's attribute. A null value indicates that the attribute
 * is not present on the element.
 * @param attName name of the attribute
 */
export function SyncWithAttr<C extends CustomElement>(attName: string) {
    return SyncValueWithAttr<C, string | null>(attName, { fromString: str => str }, null);
}

/**
 * Class field decorator. Synchronizes the value of an enum value with that
 * of an element's attribute.
 * @param attrName name of the attribute
 * @param enumerator the enumerable type
 * @param defaultValue default value used when the attribute is missing. If
 * omitted, the attribute must be present on the element.
 */
export function SyncStateWithAttr<C extends CustomElement, E extends Record<string, string>>(attrName: string, enumerator: E, defaultValue?: E[keyof E]) {
    const enumChecker = TypeChecker.cast(getEnumChecker(enumerator));

    return SyncValueWithAttr<C, E[keyof E]>(attrName, { fromString: enumChecker }, defaultValue);
}

/**
 * Class field decorator. Synchronizes the value of a set of enum values with
 * that of an element's attribute.
 * @param attrName name of the attribute
 * @param enumerator the enumerable type
 */
export function SyncStateSetWithAttr<C extends CustomElement, E extends Record<string, string>>(attrName: string, enumerator: E) {
    const enumVals = Object.values(enumerator) as E[keyof E][];

    return SyncValueWithAttr<C, Set<E[keyof E]>>(attrName, {
        fromString: str => {
            const out = new Set<E[keyof E]>();

            while (str.length !== 0) {
                const val = enumVals.find(v => str.startsWith(v));
                if (val === undefined) throw new TypeError(`"${str}" does not start with an enum member`);

                out.add(val);
                str = str.substring(val.length + 1);
            }

            return out;
        },
        toString: set => [...set.values()].join(' ')
    });
}

/**
 * Class field decorator. Synchronizes the value of a set of enum values with
 * the element's class list.
 * @param enumerator the enumerable type
 */
export function SyncStateSetWithClasses<C extends CustomElement, E extends Record<string, string>>(enumerator: E) {
    const enumVals = Object.values(enumerator) as E[keyof E][];

    return (_: undefined, ctx: ClassFieldDecoratorContext<C, Set<E[keyof E]>>) => ctx.addInitializer(function () {
        const oldValue = Reflect.get(this, ctx.name) as Set<E[keyof E]>; // funky

        Reflect.defineProperty(this, ctx.name, {
            configurable: false,
            get: () => new Set(enumVals.filter(v => this.classList.contains(v))),
            set: set => enumVals.forEach(v => this.classList.toggle(v, set.has(v)))
        });

        this.addEventListener("beforeinit", () => {
            if (!enumVals.some(v => this.classList.contains(v))) Reflect.set(this, ctx.name, oldValue);
        });
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
        this.dispatchEvent(new Event("beforeinit"));
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

    public onAttributeChanged(attrName: string | Iterable<string>, callback: (newVal: string | null, oldVal: string | null, self: this) => void, doInitialCall = false) {
        if (isString(attrName)) {
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
        else for (const n of attrName) this.onAttributeChanged(n, callback, doInitialCall);
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