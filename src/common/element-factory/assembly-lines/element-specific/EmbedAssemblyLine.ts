import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class EmbedAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLEmbedElement, P> {

    public override copy(): EmbedAssemblyLine<P> {
        return new EmbedAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLEmbedElement, P>[] = []) {
        super(() => document.createElement("embed"), defaultParameters, steps);
    }

    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLEmbedElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)).toString());
    }

    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLEmbedElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)).toString());
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLEmbedElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

}