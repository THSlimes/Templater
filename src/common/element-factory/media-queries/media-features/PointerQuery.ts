import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer
 */
class PointerQuery extends EnumerableValueMatchQuery<PointerQuery.Type> {

    public constructor(type: PointerQuery.Type) {
        super("pointer", type);
    }

}

namespace PointerQuery {

    export enum Type {
        NONE = "none",
        COARSE = "coarse",
        FINE = "fine"
    }

}

export default PointerQuery;