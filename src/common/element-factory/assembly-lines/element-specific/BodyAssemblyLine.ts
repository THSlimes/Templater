import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class BodyAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLBodyElement, P> {

    public override copy(): BodyAssemblyLine<P> {
        return new BodyAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLBodyElement, P>[] = []) {
        super(() => document.createElement("body"), defaultParameters, steps);
    }

}