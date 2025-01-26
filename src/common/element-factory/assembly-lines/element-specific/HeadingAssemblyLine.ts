import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class HeadingAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLHeadingElement, P> {

    private readonly size:HeadingAssemblyLine.Size;

    public override copy(): HeadingAssemblyLine<P> {
        return new HeadingAssemblyLine(this.size, this.defaultParameters, [...this.steps]);
    }

    constructor(size:HeadingAssemblyLine.Size, defaultParameters: P, steps: AssemblyLine.Step<HTMLHeadingElement, P>[] = []) {
        super((params) => document.createElement('h' + this.size) as HTMLHeadingElement, defaultParameters, steps);

        this.size = size
    }

}

namespace HeadingAssemblyLine {

    export type Size = 1 | 2 | 3 | 4 | 5 | 6;

}

export default HeadingAssemblyLine;