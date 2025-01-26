import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/update
 */
class UpdateQuery extends EnumerableValueMatchQuery<UpdateQuery.Type> {

    public constructor(type: UpdateQuery.Type) {
        super("update", type);
    }

}

namespace UpdateQuery {

    export enum Type {
        NONE = "none",
        SLOW = "slow",
        FAST = "fast"
    }

}

export default UpdateQuery;