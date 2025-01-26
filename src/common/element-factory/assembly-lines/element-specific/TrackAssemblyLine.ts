import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class TrackAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTrackElement, P> {

    public override copy(): TrackAssemblyLine<P> {
        return new TrackAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLTrackElement, P>[] = []) {
        super(() => document.createElement("track"), defaultParameters, steps);
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLTrackElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public isDefault(isDefault: AssemblyLine.DynamicValue.Either<boolean, HTMLTrackElement, P>): this {
        return this.addStep((e, params) => e.default = AssemblyLine.DynamicValue.resolve(isDefault, e, params));
    }

    public kind(kind: AssemblyLine.DynamicValue.Either<TrackAssemblyLine.Kind, HTMLTrackElement, P>): this {
        return this.addStep((e, params) => e.kind = AssemblyLine.DynamicValue.resolve(kind, e, params));
    }

    public label(label: AssemblyLine.DynamicValue.Either<string, HTMLTrackElement, P>): this {
        return this.addStep((e, params) => e.label = AssemblyLine.DynamicValue.resolve(label, e, params));
    }

    public sourceLanguage(sourceLanguage: AssemblyLine.DynamicValue.Either<string | Intl.Locale, HTMLTrackElement, P>): this {
        return this.addStep((e, params) => {
            const resolved = typeof sourceLanguage === "function" ? sourceLanguage(e, params) : sourceLanguage;
            e.srclang = typeof resolved === "string" ? resolved : resolved.language;
        });
    }

}

namespace TrackAssemblyLine {

    export enum Kind {
        SUBTITLES = "subtitles",
        CAPTIONS = "captions",
        CHAPTERS = "chapters",
        METADATA = "metadata"
    }

}

export default TrackAssemblyLine;