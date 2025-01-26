import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class TableAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTableElement, P> {

    public override copy(): TableAssemblyLine<P> {
        return new TableAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTableElement, P>[] = []) {
        super(() => document.createElement("table"), defaultParameters, steps);
    }

    public caption(caption: AssemblyLine.DynamicValue.Either<string, HTMLTableElement, P>) {
        return this.addStep((e, params) => {
            const captionElem = document.createElement("caption");
            captionElem.textContent = AssemblyLine.DynamicValue.resolve(caption, e, params);
            
            e.caption = captionElem;
        });
    }

}