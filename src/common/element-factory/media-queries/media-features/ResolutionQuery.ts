import Resolution from "../../css-styling/Resolution";
import ValueComparisonQuery from "../ValueComparisonQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution
 */
export default class ResolutionQuery extends ValueComparisonQuery {

    private readonly resolution: Resolution;

    constructor(mode: ValueComparisonQuery.Mode, resolution: Resolution) {
        super("resolution", mode);

        this.resolution = resolution;
    }

    protected override getValueString(): string {
        return this.resolution;
    }

}