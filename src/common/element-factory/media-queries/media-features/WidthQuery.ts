import Length from "../../css-styling/Length";
import ValueComparisonQuery from "../ValueComparisonQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width
 */
export default class WidthQuery extends ValueComparisonQuery {

    private readonly length: Length;

    constructor(mode: ValueComparisonQuery.Mode, length: Length) {
        super("width", mode);

        this.length = length;
    }

    protected override getValueString(): string {
        return this.length;
    }

}