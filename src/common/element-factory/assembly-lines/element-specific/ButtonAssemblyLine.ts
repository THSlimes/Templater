import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class ButtonAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLButtonElement, P> {

    public override copy(): ButtonAssemblyLine<P> {
        return new ButtonAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLButtonElement, P>[] = []) {
        super(() => document.createElement("button"), defaultParameters, steps);
    }

    public doDisable(doDisable: AssemblyLine.DynamicValue.Either<boolean, HTMLButtonElement, P>) {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(doDisable, e, params));
    }

    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLButtonElement, P>) {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

}