import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class HRAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLHRElement, P> {

    public override copy(): HRAssemblyLine<P> {
        return new HRAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLHRElement, P>[] = []) {
        super(() => document.createElement("hr"), defaultParameters, steps);
    }

}