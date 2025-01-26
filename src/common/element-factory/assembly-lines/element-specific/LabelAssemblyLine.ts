import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class LabelAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLLabelElement, P> {

    public override copy(): LabelAssemblyLine<P> {
        return new LabelAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLLabelElement, P>[] = []) {
        super(() => document.createElement("label"), defaultParameters, steps);
    }

    public for(elementOrID: AssemblyLine.DynamicValue.Either<Primitive | Element, HTMLLabelElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof elementOrID === "function" ? elementOrID(e, params) : elementOrID;
            e.id = resolved instanceof Element ? resolved.id : String(resolved);
        });
    }

}