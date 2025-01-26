import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
class PrefersContrastQuery extends EnumerableValueMatchQuery<PrefersContrastQuery.Contrast> {

    public constructor(contrast: PrefersContrastQuery.Contrast) {
        super("prefers-contrast", contrast)
    }

}

namespace PrefersContrastQuery {

    export enum Contrast {
        NO_PREFERENCE = "no-preference",
        MORE = "more",
        LESS = "less",
        CUSTOM = "custom"
    }

}

export default PrefersContrastQuery;