import MediaQuery from "../MediaQuery";

export default class AndQuery extends MediaQuery {

    private readonly subqueries: MediaQuery[];

    constructor(...subqueries: MediaQuery[]) {
        super();

        Object.freeze(this.subqueries = subqueries);
    }

    public override toString(): string {
        return this.subqueries.map(q => `(${q.toString()})`)
            .join(' and ');
    }

}