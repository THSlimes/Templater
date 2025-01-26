import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation
 */
class OrientationQuery extends EnumerableValueMatchQuery<OrientationQuery.Orientation> {

    public constructor(type: OrientationQuery.Orientation) {
        super("orientation", type);
    }

}

namespace OrientationQuery {

    export enum Orientation {
        PORTRAIT = "portrait",
        LANDSCAPE = "landscape"
    }

}

export default OrientationQuery;