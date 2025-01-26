import { Primitive } from "../../../util/UtilTypes";
import AssemblyLine from "../AssemblyLine";
import FetchingAssemblyLine from "./FetchingAssemblyLine";

class ImageAssemblyLine<P extends AssemblyLine.Parameters> extends FetchingAssemblyLine<HTMLImageElement, P> {

    public override copy(): ImageAssemblyLine<P> {
        return new ImageAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLImageElement, P>[] = []) {
        super(() => document.createElement("img"), defaultParameters, steps);
    }

    public alt(alt: AssemblyLine.DynamicValue.Either<Primitive, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.alt = String(AssemblyLine.DynamicValue.resolve(alt, e, params)));
    }

    public loadingMode(loadingMode: AssemblyLine.DynamicValue.Either<ImageAssemblyLine.LoadingMode, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.loading = AssemblyLine.DynamicValue.resolve(loadingMode, e, params));
    }

    public width(width: AssemblyLine.DynamicValue.Either<number, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.width = Math.floor(AssemblyLine.DynamicValue.resolve(width, e, params)));
    }

    public height(height: AssemblyLine.DynamicValue.Either<number, HTMLImageElement, P>) {
        return this.addStep((e, params) => e.height = Math.floor(AssemblyLine.DynamicValue.resolve(height, e, params)));
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLImageElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public srcset(...sources: AssemblyLine.DynamicValue.Either<string | URL, HTMLImageElement, P>[]) {
        return this.addStep((e, params) =>
            e.srcset = sources.map(src => typeof src === "function" ? src(e, params) : src)
                .map(String)
                .join(',')
        );
    }

    public sizes(...sizes: AssemblyLine.DynamicValue.Either<string, HTMLImageElement, P>[]) {
        return this.addStep((e, params) =>
            e.sizes = sizes.map(s => AssemblyLine.DynamicValue.resolve(s, e, params))
                .join(',')
        );
    }

}

namespace ImageAssemblyLine {

    export enum LoadingMode {
        EAGER = "eager",
        LAZY = "lazy"
    }

}

export default ImageAssemblyLine;