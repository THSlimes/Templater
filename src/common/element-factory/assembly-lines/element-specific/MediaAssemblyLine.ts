import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class MediaAssemblyLine<E extends HTMLMediaElement, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<E, P> {

    public override copy(): MediaAssemblyLine<E, P> {
        return new MediaAssemblyLine(this.mold, this.defaultParameters, [...this.steps]);
    }

    public showControls(showControls: AssemblyLine.DynamicValue.Either<boolean, E, P>) {
        return this.addStep((e, params) => e.controls = AssemblyLine.DynamicValue.resolve(showControls, e, params));
    }

    public doLoop(doLoop: AssemblyLine.DynamicValue.Either<boolean, E, P>) {
        return this.addStep((e, params) => e.loop = AssemblyLine.DynamicValue.resolve(doLoop, e, params));
    }

    public doMute(doMute: AssemblyLine.DynamicValue.Either<boolean, E, P>) {
        return this.addStep((e, params) => e.muted = AssemblyLine.DynamicValue.resolve(doMute, e, params));
    }

    public rate(rate: AssemblyLine.DynamicValue.Either<number, E, P>, preserverPitch: AssemblyLine.DynamicValue.Either<boolean, E, P> = false) {
        return this.addStep((e, params) => {
            e.playbackRate = AssemblyLine.DynamicValue.resolve(rate, e, params);
            e.preservesPitch = AssemblyLine.DynamicValue.resolve(preserverPitch, e, params);
        });
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, E, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

}