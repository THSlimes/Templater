import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


abstract class FetchingAssemblyLine<E extends FetchingAssemblyLine.FetchingElement, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<E, P> {

    public fetchPriority(fetchPriority: AssemblyLine.DynamicValue.Either<FetchingAssemblyLine.FetchPriority, FetchingAssemblyLine.FetchingElement, P>) {
        return this.addStep((e, params) => e.fetchPriority = AssemblyLine.DynamicValue.resolve(fetchPriority, e, params));
    }

}

namespace FetchingAssemblyLine {

    export type FetchingElement = HTMLElement & { fetchPriority: string };

    export enum FetchPriority {
        LOW = "low",
        HIGH = "high",
        AUTO = "auto"
    }

}

export default FetchingAssemblyLine;