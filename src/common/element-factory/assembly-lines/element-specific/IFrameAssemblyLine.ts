import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class IFrameAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLIFrameElement, P> {

    public override copy(): IFrameAssemblyLine<P> {
        return new IFrameAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLIFrameElement, P>[] = []) {
        super(() => document.createElement("iframe"), defaultParameters, steps);
    }

    public allow(allow: AssemblyLine.DynamicValue.Either<string, HTMLIFrameElement, P>) {
        return this.addStep((e, params) => e.allow = AssemblyLine.DynamicValue.resolve(allow, e, params));
    }

    public allowFullscreen(allowFullscreen: AssemblyLine.DynamicValue.Either<boolean, HTMLIFrameElement, P>) {
        return this.addStep((e, params) => e.allowFullscreen = AssemblyLine.DynamicValue.resolve(allowFullscreen, e, params));
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLIFrameElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

}