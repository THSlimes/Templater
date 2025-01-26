import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-inline
 */
export default class OverflowInlineQuery extends EnumerableValueMatchQuery<"scroll" | "none"> {

    public constructor(showOverflow: boolean) {
        super("overflow-inline", showOverflow ? "scroll" : "none");
    }

}