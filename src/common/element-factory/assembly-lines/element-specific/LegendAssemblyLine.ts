import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class LegendAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLLegendElement, P> {

    public override copy(): LegendAssemblyLine<P> {
        return new LegendAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLLegendElement, P>[] = []) {
        super(() => document.createElement("legend"), defaultParameters, steps);
    }

}