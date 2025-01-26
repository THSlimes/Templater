import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colo
 */
export default class InvertedColorsQuery extends EnumerableValueMatchQuery<"inverted" | "none"> {

    public constructor(usesInvertedColors: boolean) {
        super("inverted-colors", usesInvertedColors ? "inverted" : "none");
    }

}