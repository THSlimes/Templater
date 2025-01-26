import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class TableCaptionAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTableCaptionElement, P> {

    public override copy(): TableCaptionAssemblyLine<P> {
        return new TableCaptionAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTableCaptionElement, P>[] = []) {
        super(() => document.createElement("caption"), defaultParameters, steps);
    }

}