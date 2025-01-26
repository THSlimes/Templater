import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export default class PrefersReducedMotionQuery extends EnumerableValueMatchQuery<"reduce" | "no-preference"> {

    public constructor(prefersReducedMotion: boolean) {
        super("prefers-reduced-motion", prefersReducedMotion ? "reduce" : "no-preference");
    }

}