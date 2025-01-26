import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class OutputAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLOutputElement, P> {

    public override copy(): OutputAssemblyLine<P> {
        return new OutputAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLOutputElement, P>[] = []) {
        super(() => document.createElement("output"), defaultParameters, steps);
    }

    public name(name: AssemblyLine.DynamicValue.Either<string, HTMLOutputElement, P>) {
        return this.addStep((e, params) => e.name = AssemblyLine.DynamicValue.resolve(name, e, params));
    }

    public value(value: AssemblyLine.DynamicValue.Either<string, HTMLOutputElement, P>) {
        return this.addStep((e, params) => e.value = AssemblyLine.DynamicValue.resolve(value, e, params));
    }

    public for(...elementOrIDs: AssemblyLine.DynamicValue.Either<string | Element, HTMLOutputElement, P>[]) {
        return this.addStep((e, params) =>
            e.setAttribute("for", elementOrIDs.map(elemOrID => typeof elemOrID === "function" ? elemOrID(e, params) : elemOrID)
                .map(elemOrID => elemOrID instanceof Element ? elemOrID.id : elemOrID)
                .join(' '))
        );
    }

}