import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";
import OptionAssemblyLine from "./OptionAssemblyLine";

export default class OptGroupAssemblyLine<P extends AssemblyLine.Parameters, V extends string = never> extends BasicAssemblyLine<HTMLOptGroupElement, P> {

    public override copy(): OptGroupAssemblyLine<P, V> {
        return new OptGroupAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLOptGroupElement, P>[] = []) {
        super(() => document.createElement("optgroup"), defaultParameters, steps);
    }

    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLOptGroupElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    public label(label: AssemblyLine.DynamicValue.Either<string, HTMLOptGroupElement, P>): this {
        return this.addStep((e, params) => e.label = AssemblyLine.DynamicValue.resolve(label, e, params));
    }

    public options<AV extends string>(...options: OptionAssemblyLine<AV, P>[]) {
        return this.children(...options) as OptGroupAssemblyLine<P, V | AV>;
    }

}