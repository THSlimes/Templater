import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class MenuAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLMenuElement, P> {

    public override copy(): MenuAssemblyLine<P> {
        return new MenuAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLMenuElement, P>[] = []) {
        super(() => document.createElement("menu"), defaultParameters, steps);
    }

}