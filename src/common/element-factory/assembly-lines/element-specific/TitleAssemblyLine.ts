import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class TitleAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTitleElement, P> {

    public override copy(): TitleAssemblyLine<P> {
        return new TitleAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTitleElement, P>[] = []) {
        super(() => document.createElement("title"), defaultParameters, steps);
    }

    public override text(text: AssemblyLine.DynamicValue.Either<Primitive, HTMLTitleElement, P>): this {
        // set text property instead of textContent
        return this.addStep((e, params) => e.text = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

}