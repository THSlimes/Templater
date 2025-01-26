import Colors from "../../css-styling/Colors";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class MetaAssemblyLine<N extends MetaAssemblyLine.Name, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLMetaElement, P> {

    private readonly name: N;

    public override copy(): MetaAssemblyLine<N, P> {
        return new MetaAssemblyLine(this.name, this.defaultParameters, [...this.steps]);
    }

    constructor(name: N, defaultParameters: P, steps: AssemblyLine.Step<HTMLMetaElement, P>[] = []) {
        super(() => {
            const out = document.createElement("meta");
            out.name = name;
            return out;
        }, defaultParameters, steps);

        this.name = name;
    }

    public content(name: AssemblyLine.DynamicValue.Either<MetaAssemblyLine.ContentForName<N>, HTMLMetaElement, P>) {
        return this.addStep((e, params) =>
            e.content = [AssemblyLine.DynamicValue.resolve(name, e, params)]
                .flat()
                .join(',')
        );
    }

}

namespace MetaAssemblyLine {

    export enum Name {
        AUTHOR = "author",
        DESCRIPTION = "description",
        GENERATOR = "generator",
        KEYWORDS = "keywords",
        REFERRER = "referrer",
        THEME_COLOR = "theme-color"
    }

    enum ReferrerContent {
        ORIGIN = "origin",
        NO_REFERRER_WHEN_DOWNGRADE = "no-referrer-when-downgrade",
        ORIGIN_WHEN_CROSS_ORIGIN = "origin-when-cross-origin",
        SAME_ORIGIN = "same-origin",
        STRICT_ORIGIN = "strict-origin",
        STRICT_ORIGIN_WHEN_CROSS_ORIGIN = "strict-origin-when-cross-origin",
        UNSAFE_URL = "unsafe-URL"
    }

    interface NameContentMap {
        [Name.AUTHOR]: string,
        [Name.DESCRIPTION]: string,
        [Name.GENERATOR]: string,
        [Name.KEYWORDS]: string[],
        [Name.REFERRER]: ReferrerContent,
        [Name.THEME_COLOR]: Colors.Hex
    }
    export type ContentForName<N extends Name> = NameContentMap[N];

    export const DEFAULT_CREATORS: { [N in Name]: <P extends AssemblyLine.Parameters>(dp: P) => MetaAssemblyLine<N, P> } = Object.freeze({
        [Name.AUTHOR]: dp => new MetaAssemblyLine(Name.AUTHOR, dp),
        [Name.DESCRIPTION]: dp => new MetaAssemblyLine(Name.DESCRIPTION, dp),
        [Name.GENERATOR]: dp => new MetaAssemblyLine(Name.GENERATOR, dp),
        [Name.KEYWORDS]: dp => new MetaAssemblyLine(Name.KEYWORDS, dp),
        [Name.REFERRER]: dp => new MetaAssemblyLine(Name.REFERRER, dp),
        [Name.THEME_COLOR]: dp => new MetaAssemblyLine(Name.THEME_COLOR, dp)
    });
    
}

export default MetaAssemblyLine;