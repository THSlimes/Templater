import MediaQuery from "./MediaQuery";

export default class EnumerableValueMatchQuery<E extends string> extends MediaQuery {

    private readonly featureName: string;
    private readonly matchValue: E;

    public constructor(featureName: string, matchValue: E) {
        super();

        this.featureName = featureName;
        this.matchValue = matchValue;
    }

    public override toString(): string {
        return `${this.featureName}: ${this.matchValue}`;
    }

}