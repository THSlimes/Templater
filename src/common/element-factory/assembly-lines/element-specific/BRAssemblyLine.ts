import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class BRAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLBRElement, P> {

    public override copy(): BRAssemblyLine<P> {
        return new BRAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLBRElement, P>[] = []) {
        super(() => document.createElement("br"), defaultParameters, steps);
    }

}