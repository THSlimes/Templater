import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
 */
export default class HoverQuery extends EnumerableValueMatchQuery<"hover" | "none"> {

    public constructor(canHover: boolean) {
        super("hover", canHover ? "hover" : "none");
    }

}