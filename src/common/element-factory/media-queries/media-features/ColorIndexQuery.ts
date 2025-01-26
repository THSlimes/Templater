import ValueComparisonQuery from "../ValueComparisonQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-index
 */
export default class ColorIndexQuery extends ValueComparisonQuery {

    private readonly numEntries: number;

    constructor(mode: ValueComparisonQuery.Mode, numEntries: number) {
        super("color-index", mode);

        this.numEntries = Math.floor(numEntries);
    }

    protected override getValueString(): string {
        return this.numEntries.toString();
    }

}