import MediaQuery from "../../media-queries/MediaQuery";
import AssemblyLine from "../AssemblyLine";
import FetchingAssemblyLine from "./FetchingAssemblyLine";

class LinkAssemblyLine<R extends LinkAssemblyLine.Relationship, P extends AssemblyLine.Parameters> extends FetchingAssemblyLine<HTMLLinkElement, P> {

    protected readonly relationship: R;

    public override copy(): LinkAssemblyLine<R, P> {
        return new LinkAssemblyLine(this.relationship, this.defaultParameters, [...this.steps]);
    }

    constructor(relationship: R, defaultParameters: P, steps: AssemblyLine.Step<HTMLLinkElement, P>[] = []) {
        super(() => { // set correct rel value
            const out = document.createElement("link");
            out.rel = relationship;
            return out;
        }, defaultParameters, steps);

        this.relationship = relationship;
    }

    public href(href: AssemblyLine.DynamicValue.Either<string | URL, HTMLLinkElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof href === "function" ? href(e, params) : href;
            e.href = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public type(type: AssemblyLine.DynamicValue.Either<string, HTMLLinkElement, P>) {
        return this.addStep((e, params) => e.type = AssemblyLine.DynamicValue.resolve(type, e, params));
    }

    public media(media: AssemblyLine.DynamicValue.Either<MediaQuery, HTMLLinkElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof media === "function" ? media(e, params) : media;
            e.media = resolved.toString();
        });
    }

}

namespace LinkAssemblyLine {

    export enum Relationship {
        ALTERNATE = "alternate",
        AUTHOR = "author",
        CANONICAL = "canonical",
        DNS_PREFETCH = "dns-prefetch",
        EXPECT = "expect",
        HELP = "help",
        ICON = "icon",
        LICENSE = "license",
        MANIFEST = "manifest",
        ME = "me",
        MODULE_PRELOAD = "modulepreload",
        NEXT = "next",
        PING_BACK = "pingback",
        PRECONNECT = "preconnect",
        PREFETCH = "prefetch",
        PRELOAD = "preload",
        PRERENDER = "prerender",
        PREV = "prev",
        PRIVACY_POLICY = "privacy-policy",
        SEARCH = "search",
        STYLESHEET = "stylesheet",
        TERMS_OF_SERVICE = "terms-of-service"
    }

    interface RelationshipAssemblyLineMap<P extends AssemblyLine.Parameters> {
        [Relationship.ALTERNATE]: LinkAssemblyLine<Relationship.ALTERNATE, P>
        [Relationship.AUTHOR]: LinkAssemblyLine<Relationship.AUTHOR, P>,
        [Relationship.CANONICAL]: LinkAssemblyLine<Relationship.CANONICAL, P>,
        [Relationship.DNS_PREFETCH]: LinkAssemblyLine<Relationship.DNS_PREFETCH, P>,
        [Relationship.EXPECT]: LinkAssemblyLine<Relationship.EXPECT, P>,
        [Relationship.HELP]: LinkAssemblyLine<Relationship.HELP, P>,
        [Relationship.ICON]: LinkAssemblyLine<Relationship.ICON, P>,
        [Relationship.LICENSE]: LinkAssemblyLine<Relationship.LICENSE, P>,
        [Relationship.MANIFEST]: LinkAssemblyLine<Relationship.MANIFEST, P>,
        [Relationship.ME]: LinkAssemblyLine<Relationship.ME, P>,
        [Relationship.MODULE_PRELOAD]: PreloadingLinkAssemblyLine<Relationship.MODULE_PRELOAD, P>,
        [Relationship.NEXT]: LinkAssemblyLine<Relationship.NEXT, P>,
        [Relationship.PING_BACK]: LinkAssemblyLine<Relationship.PING_BACK, P>,
        [Relationship.PRECONNECT]: LinkAssemblyLine<Relationship.PRECONNECT, P>,
        [Relationship.PREFETCH]: LinkAssemblyLine<Relationship.PREFETCH, P>,
        [Relationship.PRELOAD]: PreloadingLinkAssemblyLine<Relationship.PRELOAD, P>,
        [Relationship.PRERENDER]: LinkAssemblyLine<Relationship.PRERENDER, P>,
        [Relationship.PREV]: LinkAssemblyLine<Relationship.PREV, P>,
        [Relationship.PRIVACY_POLICY]: LinkAssemblyLine<Relationship.PRIVACY_POLICY, P>,
        [Relationship.SEARCH]: LinkAssemblyLine<Relationship.SEARCH, P>,
        [Relationship.STYLESHEET]: LinkAssemblyLine<Relationship.STYLESHEET, P>,
        [Relationship.TERMS_OF_SERVICE]: LinkAssemblyLine<Relationship.TERMS_OF_SERVICE, P>
    };

    export const DEFAULT_CREATORS: { [R in Relationship]: <P extends AssemblyLine.Parameters>(dp: P) => RelationshipAssemblyLineMap<P>[R] } = Object.freeze({
        [Relationship.ALTERNATE]: dp => new LinkAssemblyLine(Relationship.ALTERNATE, dp),
        [Relationship.AUTHOR]: dp => new LinkAssemblyLine(Relationship.AUTHOR, dp),
        [Relationship.CANONICAL]: dp => new LinkAssemblyLine(Relationship.CANONICAL, dp),
        [Relationship.DNS_PREFETCH]: dp => new LinkAssemblyLine(Relationship.DNS_PREFETCH, dp),
        [Relationship.EXPECT]: dp => new LinkAssemblyLine(Relationship.EXPECT, dp),
        [Relationship.HELP]: dp => new LinkAssemblyLine(Relationship.HELP, dp),
        [Relationship.ICON]: dp => new LinkAssemblyLine(Relationship.ICON, dp),
        [Relationship.LICENSE]: dp => new LinkAssemblyLine(Relationship.LICENSE, dp),
        [Relationship.MANIFEST]: dp => new LinkAssemblyLine(Relationship.MANIFEST, dp),
        [Relationship.ME]: dp => new LinkAssemblyLine(Relationship.ME, dp),
        [Relationship.MODULE_PRELOAD]: dp => new PreloadingLinkAssemblyLine(Relationship.MODULE_PRELOAD, dp),
        [Relationship.NEXT]: dp => new LinkAssemblyLine(Relationship.NEXT, dp),
        [Relationship.PING_BACK]: dp => new LinkAssemblyLine(Relationship.PING_BACK, dp),
        [Relationship.PRECONNECT]: dp => new LinkAssemblyLine(Relationship.PRECONNECT, dp),
        [Relationship.PREFETCH]: dp => new LinkAssemblyLine(Relationship.PREFETCH, dp),
        [Relationship.PRELOAD]: dp => new PreloadingLinkAssemblyLine(Relationship.PRELOAD, dp),
        [Relationship.PRERENDER]: dp => new LinkAssemblyLine(Relationship.PRERENDER, dp),
        [Relationship.PREV]: dp => new LinkAssemblyLine(Relationship.PREV, dp),
        [Relationship.PRIVACY_POLICY]: dp => new LinkAssemblyLine(Relationship.PRIVACY_POLICY, dp),
        [Relationship.SEARCH]: dp => new LinkAssemblyLine(Relationship.SEARCH, dp),
        [Relationship.STYLESHEET]: dp => new LinkAssemblyLine(Relationship.STYLESHEET, dp),
        [Relationship.TERMS_OF_SERVICE]: dp => new LinkAssemblyLine(Relationship.TERMS_OF_SERVICE, dp)
    });

}

export default LinkAssemblyLine;



export class PreloadingLinkAssemblyLine<R extends PreloadingLinkAssemblyLine.Relationship, P extends AssemblyLine.Parameters> extends LinkAssemblyLine<R, P> {

    public override copy(): PreloadingLinkAssemblyLine<R, P> {
        return new PreloadingLinkAssemblyLine(this.relationship, this.defaultParameters, [...this.steps]);
    }

    public as(as: AssemblyLine.DynamicValue.Either<PreloadingLinkAssemblyLine.ContentType, HTMLLinkElement, P>) {
        return this.addStep((e, params) => e.as = AssemblyLine.DynamicValue.resolve(as, e, params));
    }

}

export namespace PreloadingLinkAssemblyLine {

    export type Relationship =
        LinkAssemblyLine.Relationship.PRELOAD |
        LinkAssemblyLine.Relationship.MODULE_PRELOAD;

    export enum ContentType {
        AUDIO = "audio",
        DOCUMENT = "document",
        EMBED = "embed",
        FETCH = "fetch",
        FONT = "font",
        IMAGE = "image",
        OBJECT = "object",
        SCRIPT = "script",
        STYLE = "style",
        TRACK = "track",
        VIDEO = "video",
        WORKER = "worker"
    }

}