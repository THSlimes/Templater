import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";
import OptGroupAssemblyLine from "./OptGroupAssemblyLine";
import OptionAssemblyLine from "./OptionAssemblyLine";

export default class SelectAssemblyLine<P extends AssemblyLine.Parameters, V extends string = never> extends BasicAssemblyLine<HTMLSelectElement, P> {

    public override copy(): SelectAssemblyLine<P, V> {
        return new SelectAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLSelectElement, P>[] = []) {
        super(() => document.createElement("select"), defaultParameters, steps);
    }

    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    public isRequired(isRequired: AssemblyLine.DynamicValue.Either<boolean, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.required = AssemblyLine.DynamicValue.resolve(isRequired, e, params));
    }

    public name(name: AssemblyLine.DynamicValue.Either<string, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.name = AssemblyLine.DynamicValue.resolve(name, e, params));
    }

    public options<AV extends string>(...options: (OptionAssemblyLine<AV, P> | OptGroupAssemblyLine<P, AV>)[]) {
        return this.addStep((e, params) => options.forEach(o => e.add(o.make(params)))) as SelectAssemblyLine<P, V | AV>;
    }

    public value(value: AssemblyLine.DynamicValue.Either<V, HTMLSelectElement, P>): this {
        return this.addStep((e, params) => e.value = AssemblyLine.DynamicValue.resolve(value, e, params));
    }

    public onValueChanged(listener: (value: V, ev: Event, select: HTMLSelectElement) => void) {
        return this.on("change", (ev, select) => listener(select.value as V, ev, select));
    }

    public onceValueChanged(listener: (value: V, ev: Event, select: HTMLSelectElement) => void) {
        return this.once("change", (ev, select) => listener(select.value as V, ev, select));
    }


}