import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class ObjectAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLObjectElement, P> {

    public override copy(): ObjectAssemblyLine<P> {
        return new ObjectAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLObjectElement, P>[] = []) {
        super(() => document.createElement("object"), defaultParameters, steps);
    }

    public name(name: AssemblyLine.DynamicValue.Either<string, HTMLObjectElement, P>) {
        return this.addStep((e, params) => e.name = AssemblyLine.DynamicValue.resolve(name, e, params));
    }

    public data(data: AssemblyLine.DynamicValue.Either<string | URL, HTMLObjectElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof data === "function" ? data(e, params) : data;
            e.data = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public type(type: AssemblyLine.DynamicValue.Either<string, HTMLObjectElement, P>) {
        return this.addStep((e, params) => e.type = AssemblyLine.DynamicValue.resolve(type, e, params));
    }

    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLObjectElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)).toString());
    }

    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLObjectElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)).toString());
    }

}