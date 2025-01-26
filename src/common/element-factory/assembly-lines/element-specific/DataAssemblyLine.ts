import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class DataAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDataElement, P> {

    public override copy(): DataAssemblyLine<P> {
        return new DataAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDataElement, P>[] = []) {
        super(() => document.createElement("data"), defaultParameters, steps);
    }

    public value(value: AssemblyLine.DynamicValue.Either<Primitive, HTMLDataElement, P>) {
        return this.addStep((e, params) => e.value = String(AssemblyLine.DynamicValue.resolve(value, e, params)));
    }

}