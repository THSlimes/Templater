import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class OrderedListAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLOListElement, P> {

    public override copy(): OrderedListAssemblyLine<P> {
        return new OrderedListAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLOListElement, P>[] = []) {
        super(() => document.createElement("ol"), defaultParameters, steps);
    }

    public isReversed(isReversed: AssemblyLine.DynamicValue.Either<boolean, HTMLOListElement, P>) {
        return this.addStep((e, params) => e.reversed = AssemblyLine.DynamicValue.resolve(isReversed, e, params));
    }

    public start(start: AssemblyLine.DynamicValue.Either<number, HTMLOListElement, P>) {
        return this.addStep((e, params) => e.start = AssemblyLine.DynamicValue.resolve(start, e, params));
    }

    public type(type: AssemblyLine.DynamicValue.Either<OrderedListAssemblyLine.Type, HTMLOListElement, P>) {
        return this.addStep((e, params) => e.type = AssemblyLine.DynamicValue.resolve(type, e, params));
    }

}

namespace OrderedListAssemblyLine {

    export enum Type {
        DECIMAL_NUMBERS = '1',
        LOWERCASE_LETTERS = 'a',
        UPPERCASE_LETTERS = 'A',
        LOWERCASE_ROMAN_NUMERALS = 'i',
        UPPERCASE_ROMAN_NUMERALS = 'I'
    }

}

export default OrderedListAssemblyLine;