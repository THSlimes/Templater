import AssemblyLine from "../AssemblyLine";
import MediaAssemblyLine from "./MediaAssemblyLine";

export default class VideoAssemblyLine<P extends AssemblyLine.Parameters> extends MediaAssemblyLine<HTMLVideoElement, P> {

    public override copy(): VideoAssemblyLine<P> {
        return new VideoAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLVideoElement, P>[] = []) {
        super(() => document.createElement("video"), defaultParameters, steps);
    }

    public isPIPDisabled(isPIPDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLVideoElement, P>): this {
        return this.addStep((e, params) => e.disablePictureInPicture = AssemblyLine.DynamicValue.resolve(isPIPDisabled, e, params));
    }

}