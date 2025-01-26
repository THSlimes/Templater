import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class FormAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLFormElement, P> {

    public override copy(): FormAssemblyLine<P> {
        return new FormAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLFormElement, P>[] = []) {
        super(() => document.createElement("form"), defaultParameters, steps);
    }

    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLFormElement, P>) {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

    public method(method: AssemblyLine.DynamicValue.Either<FormAssemblyLine.Method, HTMLFormElement, P>) {
        return this.addStep((e, params) => e.method = String(AssemblyLine.DynamicValue.resolve(method, e, params)));
    }

}

namespace FormAssemblyLine {

    export enum Method {
        POST = "post",
        GET = "get",
        DIALOG = "dialog"
    }

}

export default FormAssemblyLine;