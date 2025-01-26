import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class OptionAssemblyLine<V extends string, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLOptionElement, P> {

    private readonly value: V;

    public override copy(): OptionAssemblyLine<V, P> {
        return new OptionAssemblyLine(this.value, this.defaultParameters, [...this.steps]);
    }

    constructor(value: V, defaultParameters: P, steps: AssemblyLine.Step<HTMLOptionElement, P>[] = []) {
        super(() => { // set value first
            const out = document.createElement("option");
            out.value = out.text = value;
            return out;
        }, defaultParameters, steps);

        this.value = value;
    }

    public override text(text: AssemblyLine.DynamicValue.Either<Primitive, HTMLOptionElement, P>): this {
        // set text property instead of textContent
        return this.addStep((e, params) => e.text = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

}