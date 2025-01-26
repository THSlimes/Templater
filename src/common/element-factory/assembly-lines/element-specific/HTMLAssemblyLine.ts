import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class HTMLAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLHtmlElement, P> {

    public override copy(): HTMLAssemblyLine<P> {
        return new HTMLAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLHtmlElement, P>[] = []) {
        super(() => document.createElement("html"), defaultParameters, steps);
    }

}