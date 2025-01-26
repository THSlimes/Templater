import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting
 */
class ScriptingQuery extends EnumerableValueMatchQuery<ScriptingQuery.Availability> {

    public constructor(availability: ScriptingQuery.Availability) {
        super("scripting", availability);
    }

}

namespace ScriptingQuery {

    export enum Availability {
        NONE = "none",
        INITIAL_ONLY = "initial-only",
        ENABLED = "enabled"
    }

}

export default ScriptingQuery;