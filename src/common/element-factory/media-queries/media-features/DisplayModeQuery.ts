import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode
 */
class DisplayModeQuery extends EnumerableValueMatchQuery<DisplayModeQuery.Mode> {

    public constructor(mode: DisplayModeQuery.Mode) {
        super("display-mode", mode);
    }

}

namespace DisplayModeQuery {

    export enum Mode {
        BROWSER = "browser",
        FULLSCREEN = "fullscreen",
        MINIMAL_UI = "minimal-ui",
        PICTURE_IN_PICTURE = "picture-in-picture",
        STANDALONE = "standalone",
        WINDOW_CONTROLS_OVERLAY = "window-controls-overlay"
    }

}

export default DisplayModeQuery;