import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class PreAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLPreElement, P> {

    public override copy(): PreAssemblyLine<P> {
        return new PreAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLPreElement, P>[] = []) {
        super(() => document.createElement("pre"), defaultParameters, steps);
    }

}