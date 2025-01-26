import ValueComparisonQuery from "../ValueComparisonQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio
 */
class AspectRatioQuery extends ValueComparisonQuery {

    private readonly ratio: AspectRatioQuery.Ratio;

    constructor(mode: ValueComparisonQuery.Mode, width: number, height: number) {
        super("aspect-ratio", mode);

        this.ratio = { width, height };
    }

    protected override getValueString(): string {
        return `${this.ratio.width}/${this.ratio.height}`;
    }

}

namespace AspectRatioQuery {

    export interface Ratio {
        width: number,
        height: number
    }

}

export default AspectRatioQuery;