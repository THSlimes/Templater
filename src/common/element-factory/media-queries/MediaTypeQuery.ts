import MediaQuery from "./MediaQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types
 */
class MediaTypeQuery extends MediaQuery {

    private readonly type: MediaTypeQuery.Type;

    public constructor(type: MediaTypeQuery.Type) {
        super();

        this.type = type;
    }

    public override toString(): string {
        return this.type;
    }

}

namespace MediaTypeQuery {

    export enum Type {
        ALL = "all",
        PRINT = "print",
        SCREEN = "screen"
    }

}

export default MediaTypeQuery