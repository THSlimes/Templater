type NonStyleKeys =
    "cssText" |
    "length" |
    "parentRule" |
    "cssFloat" |
    "getPropertyPriority" |
    "getPropertyValue" |
    "item" |
    "removeProperty" |
    "setProperty" |
    "getPropertyCSSValue";
type StyleMap = Partial<Omit<CSSStyleDeclaration, NonStyleKeys>>;

namespace StyleMap {

    export function apply<E extends ElementCSSInlineStyle>(elem: E, styleMap: StyleMap): E {
        for (const k in styleMap) {
            const propName = k as keyof StyleMap;
            elem.style[propName] = styleMap[propName]!;
        }

        return elem;
    }

}

export default StyleMap;