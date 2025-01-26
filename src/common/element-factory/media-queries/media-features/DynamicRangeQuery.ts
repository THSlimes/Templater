import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/dynamic-range
 */
export default class DynamicRangeQuery extends EnumerableValueMatchQuery<"high" | "standard"> {

    public constructor(usesDynamicRange: boolean) {
        super("dynamic-range", usesDynamicRange ? "high" : "standard");
    }

}