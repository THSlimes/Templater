import MediaQuery from "../MediaQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
 */
export default class ForcedColorsQuery extends MediaQuery {

    private readonly usesForcedColors: boolean;

    public constructor(usesForcedColors: boolean) {
        super();

        this.usesForcedColors = usesForcedColors;
    }

    public override toString(): string {
        return this.usesForcedColors ?
            "forced-colors: active" :
            "forced-colors: none";
    }

}