import MediaQuery from "../MediaQuery";

export default class NotQuery extends MediaQuery {

    private readonly subquery: MediaQuery;

    constructor(subquery: MediaQuery) {
        super();

        this.subquery = subquery;
    }

    public override toString(): string {
        return `not (${this.subquery.toString()})`;
    }

}