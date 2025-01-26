import AssemblyLine from "../AssemblyLine";
import MediaAssemblyLine from "./MediaAssemblyLine";

export default class AudioAssemblyLine<P extends AssemblyLine.Parameters> extends MediaAssemblyLine<HTMLAudioElement, P> {

    public override copy(): AudioAssemblyLine<P> {
        return new AudioAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLAudioElement, P>[] = []) {
        super(() => document.createElement("audio"), defaultParameters, steps);
    }

}