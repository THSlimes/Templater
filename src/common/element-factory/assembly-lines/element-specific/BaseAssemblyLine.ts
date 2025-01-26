import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class BaseAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLBaseElement, P> {

    public override copy(): BaseAssemblyLine<P> {
        return new BaseAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLBaseElement, P>[] = []) {
        super(() => document.createElement("base"), defaultParameters, steps);
    }

    public href(href: AssemblyLine.DynamicValue.Either<string | URL, HTMLBaseElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof href === "function" ? href(e, params) : href;
            e.href = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public openInNewTab(referrerPolicy: AssemblyLine.DynamicValue.Either<boolean, HTMLBaseElement, P>) {
        return this.addStep((e, params) => e.target = AssemblyLine.DynamicValue.resolve(referrerPolicy, e, params) ? "_blank" : "");
    }


}