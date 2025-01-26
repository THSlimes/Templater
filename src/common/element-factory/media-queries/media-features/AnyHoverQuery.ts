import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-hover
 */
export default class AnyHoverQuery extends EnumerableValueMatchQuery<"hover" | "none"> {

    public constructor(canHover: boolean) {
        super("any-hover", canHover ? "hover" : "none");
    }

}