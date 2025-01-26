import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class ParagraphAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLParagraphElement, P> {

    public override copy(): ParagraphAssemblyLine<P> {
        return new ParagraphAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLParagraphElement, P>[] = []) {
        super(() => document.createElement('p'), defaultParameters, steps);
    }

}