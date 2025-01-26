import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-pointer
 */
class AnyPointerQuery extends EnumerableValueMatchQuery<AnyPointerQuery.Type> {

    public constructor(type: AnyPointerQuery.Type) {
        super("any-pointer", type);
    }

}

namespace AnyPointerQuery {

    export enum Type {
        NONE = "none",
        COARSE = "coarse",
        FINE = "fine"
    }

}

export default AnyPointerQuery;