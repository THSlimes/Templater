import MediaQuery from "../MediaQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/grid
 */
export default class GridQuery extends MediaQuery {

    private readonly usesGrid: boolean;

    constructor(usesGrid: boolean) {
        super();

        this.usesGrid = usesGrid;
    }

    public override toString(): string {
        return "grid: " + Number(this.usesGrid);
    }

}