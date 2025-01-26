import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class FieldSetAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLFieldSetElement, P> {

    public override copy(): FieldSetAssemblyLine<P> {
        return new FieldSetAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLFieldSetElement, P>[] = []) {
        super(() => document.createElement("fieldset"), defaultParameters, steps);
    }

    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLFieldSetElement, P>) {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

}