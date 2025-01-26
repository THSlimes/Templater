import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class MeterAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLMeterElement, P> {

    public override copy(): MeterAssemblyLine<P> {
        return new MeterAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLMeterElement, P>[] = []) {
        super(() => document.createElement("meter"), defaultParameters, steps);
    }

    public high(high: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.high = AssemblyLine.DynamicValue.resolve(high, e, params));
    }

    public low(low: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.low = AssemblyLine.DynamicValue.resolve(low, e, params));
    }

    public min(min: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.min = AssemblyLine.DynamicValue.resolve(min, e, params));
    }

    public max(max: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.max = AssemblyLine.DynamicValue.resolve(max, e, params));
    }

    public optimum(optimum: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.optimum = AssemblyLine.DynamicValue.resolve(optimum, e, params));
    }

    public value(value: AssemblyLine.DynamicValue.Either<number, HTMLMeterElement, P>) {
        return this.addStep((e, params) => e.value = AssemblyLine.DynamicValue.resolve(value, e, params));
    }

}