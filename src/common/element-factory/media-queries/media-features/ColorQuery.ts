import ValueComparisonQuery from "../ValueComparisonQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color
 */
export default class ColorQuery extends ValueComparisonQuery {

    private readonly bitDepth: number;

    public constructor(mode: ValueComparisonQuery.Mode, bitDepth: number) {
        super("color", mode);

        this.bitDepth = Math.floor(bitDepth);
    }

    protected override getValueString(): string {
        return this.bitDepth.toString();
    }

    public override toString(): string {
        return (this.mode === ">=" && this.bitDepth === 1) ?
            this.featureName : // use shorthand for any color device
            super.toString();
    }

}