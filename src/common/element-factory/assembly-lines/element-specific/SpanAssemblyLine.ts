import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class SpanAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLSpanElement, P> {

    public override copy(): SpanAssemblyLine<P> {
        return new SpanAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLSpanElement, P>[] = []) {
        super(() => document.createElement("span"), defaultParameters, steps);
    }

}