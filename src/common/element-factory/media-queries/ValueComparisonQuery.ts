import MediaQuery from "./MediaQuery";

abstract class ValueComparisonQuery extends MediaQuery {

    private static MODE_PREFIXES: Record<ValueComparisonQuery.Mode, string> = {
        "==": "",
        ">=": "min-",
        "<=": "max-"
    };

    protected readonly mode: ValueComparisonQuery.Mode;
    protected readonly featureName: string;

    public constructor(featureName: string, mode: ValueComparisonQuery.Mode) {
        super();

        this.featureName = featureName;
        this.mode = mode;
    }

    protected abstract getValueString(): string;

    public override toString(): string {
        return `${ValueComparisonQuery.MODE_PREFIXES[this.mode]}${this.featureName}: ${this.getValueString()}`;
    }

}

namespace ValueComparisonQuery {

    export type Mode = "==" | ">=" | "<=";

}

export default ValueComparisonQuery;