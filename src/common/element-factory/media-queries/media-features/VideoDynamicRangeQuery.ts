import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/video-dynamic-range
 */
export default class VideoDynamicRangeQuery extends EnumerableValueMatchQuery<"high" | "standard"> {

    public constructor(usesDynamicVideoRange: boolean) {
        super("video-dynamic-range", usesDynamicVideoRange ? "high" : "standard");
    }

}