import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class AnchorAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLAnchorElement, P> {

    public override copy(): AnchorAssemblyLine<P> {
        return new AnchorAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLAnchorElement, P>[] = []) {
        super(() => document.createElement('a'), defaultParameters, steps);
    }

    public doDownload(doDownload: AssemblyLine.DynamicValue.Either<boolean, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => e.download = AssemblyLine.DynamicValue.resolve(doDownload, e, params) ? "true" : "");
    }

    public href(href: AssemblyLine.DynamicValue.Either<string | URL, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof href === "function" ? href(e, params) : href;
            e.href = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public referrerPolicy(referrerPolicy: AssemblyLine.DynamicValue.Either<string, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => e.referrerPolicy = AssemblyLine.DynamicValue.resolve(referrerPolicy, e, params));
    }

    public openInNewTab(referrerPolicy: AssemblyLine.DynamicValue.Either<boolean, HTMLAnchorElement, P>) {
        return this.addStep((e, params) => e.target = AssemblyLine.DynamicValue.resolve(referrerPolicy, e, params) ? "_blank" : "");
    }


}