import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class DialogAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDialogElement, P> {

    public override copy(): DialogAssemblyLine<P> {
        return new DialogAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDialogElement, P>[] = []) {
        super(() => document.createElement("dialog"), defaultParameters, steps);
    }

    public isOpen(isOpen: AssemblyLine.DynamicValue.Either<boolean, HTMLDialogElement, P>) {
        return this.addStep((e, params) => e.open = AssemblyLine.DynamicValue.resolve(isOpen, e, params));
    }

    public returnValue(returnValue: AssemblyLine.DynamicValue.Either<Primitive, HTMLDialogElement, P>) {
        return this.addStep((e, params) => e.returnValue = String(AssemblyLine.DynamicValue.resolve(returnValue, e, params)));
    }

}