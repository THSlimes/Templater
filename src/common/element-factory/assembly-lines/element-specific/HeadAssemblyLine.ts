import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class HeadAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLHeadElement, P> {

    public override copy(): HeadAssemblyLine<P> {
        return new HeadAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLHeadElement, P>[] = []) {
        super(() => document.createElement("head"), defaultParameters, steps);
    }

}