import MediaQuery from "../../media-queries/MediaQuery";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default class StyleAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLStyleElement, P> {

    public override copy(): StyleAssemblyLine<P> {
        return new StyleAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLStyleElement, P>[] = []) {
        super(() => document.createElement("style"), defaultParameters, steps);
    }

    public idDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLStyleElement, P>) {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    public media(media: AssemblyLine.DynamicValue.Either<MediaQuery, HTMLStyleElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof media === "function" ? media(e, params) : media;
            e.media = resolved.toString();
        });
    }

}