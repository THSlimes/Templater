import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class TextAreaAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTextAreaElement, P> {

    public override copy(): TextAreaAssemblyLine<P> {
        return new TextAreaAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTextAreaElement, P>[] = []) {
        super(() => document.createElement("textarea"), defaultParameters, steps);
    }

    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    public isRequired(isRequired: AssemblyLine.DynamicValue.Either<boolean, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.required = AssemblyLine.DynamicValue.resolve(isRequired, e, params));
    }

    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

    public override text(text: AssemblyLine.DynamicValue.Either<Primitive, HTMLTextAreaElement, P>): this {
        // set value instead of textContent
        return this.addStep((e, params) => e.value = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

    public numRows(numRows: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.rows = Math.floor(AssemblyLine.DynamicValue.resolve(numRows, e, params)));
    }

    public numColumns(numColumns: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.rows = Math.floor(AssemblyLine.DynamicValue.resolve(numColumns, e, params)));
    }

    public minLength(minLength: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.minLength = Math.floor(AssemblyLine.DynamicValue.resolve(minLength, e, params)));
    }

    public maxLength(maxLength: AssemblyLine.DynamicValue.Either<number, HTMLTextAreaElement, P>): this {
        return this.addStep((e, params) => e.maxLength = Math.floor(AssemblyLine.DynamicValue.resolve(maxLength, e, params)));
    }

}