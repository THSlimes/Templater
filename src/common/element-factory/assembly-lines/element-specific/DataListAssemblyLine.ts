import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class DataListAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDataListElement, P> {

    public override copy(): DataListAssemblyLine<P> {
        return new DataListAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDataListElement, P>[] = []) {
        super(() => document.createElement("datalist"), defaultParameters, steps);
    }

    public options(...options: AssemblyLine.DynamicValue.Either<HTMLOptionElement | AssemblyLine<HTMLOptionElement, P>, HTMLDataListElement, P>[]) {
        return this.children(...options);
    }

}