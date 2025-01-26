import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
class PrefersColorSchemeQuery extends EnumerableValueMatchQuery<PrefersColorSchemeQuery.ColorScheme> {

    public constructor(colorScheme: PrefersColorSchemeQuery.ColorScheme) {
        super("prefers-color-scheme", colorScheme)
    }

}

namespace PrefersColorSchemeQuery {

    export enum ColorScheme {
        LIGHT = "light",
        DARK = "dark"
    }

}

export default PrefersColorSchemeQuery;