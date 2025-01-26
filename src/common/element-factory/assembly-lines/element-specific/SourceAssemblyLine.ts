import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class SourceAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLSourceElement, P> {

    public override copy(): SourceAssemblyLine<P> {
        return new SourceAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLSourceElement, P>[] = []) {
        super(() => document.createElement("source"), defaultParameters, steps);
    }

    public type(type: AssemblyLine.DynamicValue.Either<string, HTMLSourceElement, P>) {
        return this.addStep((e, params) => e.type = AssemblyLine.DynamicValue.resolve(type, e, params));
    }

    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLSourceElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)));
    }

    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLSourceElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)));
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLSourceElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public srcset(...sources: AssemblyLine.DynamicValue.Either<string | URL, HTMLSourceElement, P>[]) {
        return this.addStep((e, params) =>
            e.srcset = sources.map(src => typeof src === "function" ? src(e, params) : src)
                .map(String)
                .join(',')
        );
    }

    public sizes(...sizes: AssemblyLine.DynamicValue.Either<string, HTMLSourceElement, P>[]) {
        return this.addStep((e, params) =>
            e.sizes = sizes.map(s => AssemblyLine.DynamicValue.resolve(s, e, params))
                .join(',')
        );
    }

}

export default SourceAssemblyLine;