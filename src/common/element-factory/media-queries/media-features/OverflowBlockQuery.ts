import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-block
 */
class OverflowBlockQuery extends EnumerableValueMatchQuery<OverflowBlockQuery.Overflow> {

    public constructor(overflow: OverflowBlockQuery.Overflow) {
        super("overflow-block", overflow)
    }

}

namespace OverflowBlockQuery {

    export enum Overflow {
        NONE = "none",
        SCROLL = "scroll",
        OPTIONAL_PAGED = "optional-paged",
        PAGED = "paged"
    }

}

export default OverflowBlockQuery;