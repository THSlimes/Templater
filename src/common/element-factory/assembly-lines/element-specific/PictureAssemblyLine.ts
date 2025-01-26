import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class PictureAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLPictureElement, P> {

    public override copy(): PictureAssemblyLine<P> {
        return new PictureAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLPictureElement, P>[] = []) {
        super(() => document.createElement("picture"), defaultParameters, steps);
    }

}