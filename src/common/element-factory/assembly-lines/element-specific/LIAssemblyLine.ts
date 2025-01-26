import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class LIAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLLIElement, P> {

    public override copy(): LIAssemblyLine<P> {
        return new LIAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLLIElement, P>[] = []) {
        super(() => document.createElement("li"), defaultParameters, steps);
    }

}