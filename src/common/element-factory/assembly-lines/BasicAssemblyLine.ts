import { Primitive } from "../../util/UtilTypes";
import StyleMap from "../css-styling/StyleMap";
import AssemblyLine from "./AssemblyLine";

class BasicAssemblyLine<E extends HTMLElement, P extends AssemblyLine.Parameters> extends AssemblyLine<E, P> {

    public override copy(): BasicAssemblyLine<E, P> {
        return new BasicAssemblyLine(this.mold, this.defaultParameters, [...this.steps]);
    }

    public id(id: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => e.id = String(AssemblyLine.DynamicValue.resolve(id, e, params)));
    }

    public classes(...classes: (AssemblyLine.DynamicValue.Either<Primitive | Primitive[], E, P>)[]) {
        return this.addStep((e, params) =>
            e.classList.add(
                ...classes
                    .map(cls => AssemblyLine.DynamicValue.resolve(cls, e, params))
                    .flat(1)
                    .flatMap(cls => String(cls).split(' '))
            )
        );
    }

    public attribute(name: AssemblyLine.DynamicValue.Either<Primitive, E, P>, value?: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => {
            const attrName = String(AssemblyLine.DynamicValue.resolve(name, e, params));
            if (value === undefined) e.toggleAttribute(attrName, true);
            else e.setAttribute(attrName, String(AssemblyLine.DynamicValue.resolve(value, e, params)));
        });
    }

    public attributes(nameValueMapping: Record<string, AssemblyLine.DynamicValue.Either<Primitive, E, P>>) {
        return this.addStep((e, params) => {
            for (const k in nameValueMapping) e.setAttribute(k, String(AssemblyLine.DynamicValue.resolve(nameValueMapping[k], e, params)));
        });
    }

    public text(text: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => e.textContent = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

    public style(styleMap: BasicAssemblyLine.ComputableStyleMap<E, P>) {
        return this.addStep((e, params) => {
            const resolvedStyleMap: StyleMap = {};
            for (const k in styleMap) {
                const propName = k as keyof StyleMap;
                resolvedStyleMap[propName] = String(AssemblyLine.DynamicValue.resolve(styleMap[propName], e, params));
            }

            StyleMap.apply(e, resolvedStyleMap);
        });
    }

    public tooltip(text: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => e.title = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

    public children(...children: AssemblyLine.DynamicValue.Either<false | null | string | HTMLElement | AssemblyLine<any, P>, E, P>[]) {
        return this.addStep((e, params) => {
            for (const child of children) {
                const resolved = typeof child === "function" ? child(e, params) : child;

                if (resolved) {
                    if (typeof resolved === "string") e.appendChild(document.createTextNode(resolved));
                    else if (resolved instanceof HTMLElement) e.appendChild(resolved);
                    else e.appendChild(resolved.make(params));
                }
            }
        });
    }

    public on<T extends keyof HTMLElementEventMap>(type: T, listener: (ev: HTMLElementEventMap[T], elem: E) => void) {
        return this.addStep(e => e.addEventListener(type, ev => listener(ev, e)));
    }

    public once<T extends keyof HTMLElementEventMap>(type: T, listener: (ev: HTMLElementEventMap[T], elem: E) => void) {
        return this.addStep(e => e.addEventListener(type, ev => listener(ev, e), { once: true }));
    }

    public onAttributeChanged(attrName: string, callback: (newVal: string | null, oldVal: string | null, self: E) => void) {
        return this.addStep(e =>
            new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    if (mutation.type === "attributes") {
                        const newValue = e.getAttribute(attrName);
                        if (newValue !== mutation.oldValue) callback(newValue, mutation.oldValue, e);
                    }
                }
            }).observe(e, { attributes: true, attributeOldValue: true, attributeFilter: [attrName] })
        );
    }

    public do(funct: (elem: E, params: P) => void) {
        return this.addStep(funct);
    }



    public static fromTagName<TN extends keyof HTMLElementTagNameMap>(tagName: TN): BasicAssemblyLine<HTMLElementTagNameMap[TN], {}>;
    public static fromTagName<TN extends keyof HTMLElementTagNameMap, P extends AssemblyLine.Parameters>(tagName: TN): BasicAssemblyLine<HTMLElementTagNameMap[TN], P>;
    public static fromTagName<TN extends keyof HTMLElementTagNameMap, P extends AssemblyLine.Parameters>(tagName: TN, defaultParameters?: P) {
        return defaultParameters === undefined ?
            new BasicAssemblyLine(() => document.createElement(tagName), {}) :
            new BasicAssemblyLine(() => document.createElement(tagName), defaultParameters);
    }

}

namespace BasicAssemblyLine {

    export type ComputableStyleMap<E extends HTMLElement, P extends AssemblyLine.Parameters> = Partial<Record<keyof StyleMap, AssemblyLine.DynamicValue.Either<Primitive, E, P>>>;

}

export default BasicAssemblyLine;