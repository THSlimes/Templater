import Length from "../css-styling/Length";
import Resolution from "../css-styling/Resolution";
import AnyHoverQuery from "./media-features/AnyHoverQuery";
import AnyPointerQuery from "./media-features/AnyPointerQuery";
import AspectRatioQuery from "./media-features/AspectRatioQuery";
import ColorGamutQuery from "./media-features/ColorGamutQuery";
import ColorIndexQuery from "./media-features/ColorIndexQuery";
import ColorQuery from "./media-features/ColorQuery";
import DisplayModeQuery from "./media-features/DisplayModeQuery";
import DynamicRangeQuery from "./media-features/DynamicRangeQuery";
import ForcedColorsQuery from "./media-features/ForcedColorsQuery";
import GridQuery from "./media-features/GridQuery";
import HeightQuery from "./media-features/HeightQuery";
import HoverQuery from "./media-features/HoverQuery";
import InvertedColorsQuery from "./media-features/InvertedColorsQuery";
import MonochromeQuery from "./media-features/MonochromeQuery";
import OrientationQuery from "./media-features/OrientationQuery";
import OverflowBlockQuery from "./media-features/OverflowBlockQuery";
import OverflowInlineQuery from "./media-features/OverflowInlineQuery";
import PointerQuery from "./media-features/PointerQuery";
import PrefersColorSchemeQuery from "./media-features/PrefersColorScemeQuery";
import PrefersContrastQuery from "./media-features/PrefersContrastQuery";
import ResolutionQuery from "./media-features/ResolutionQuery";
import ScriptingQuery from "./media-features/ScriptingQuery";
import UpdateQuery from "./media-features/UpdateQuery";
import VideoDynamicRangeQuery from "./media-features/VideoDynamicRangeQuery";
import WidthQuery from "./media-features/WidthQuery";
import MediaQuery from "./MediaQuery";
import AndQuery from "./query-operations/AndQuery";
import NotQuery from "./query-operations/NotQuery";
import OrQuery from "./query-operations/OrQuery";

export default class MediaQueryFactory {

    public static INSTANCE = new MediaQueryFactory();



    public not(query: MediaQuery) {
        return new NotQuery(query);
    }

    public or(...queries: MediaQuery[]) {
        return new OrQuery(...queries);
    }

    public and(...queries: MediaQuery[]) {
        return new AndQuery(...queries);
    }


    public anyHover(canHover: boolean) {
        return new AnyHoverQuery(canHover);
    }

    public anyPointer(type: AnyPointerQuery.Type) {
        return new AnyPointerQuery(type);
    }

    public minAspectRatio(width: number, height: number) {
        return new AspectRatioQuery(">=", width, height);
    }
    public aspectRatio(width: number, height: number) {
        return new AspectRatioQuery("==", width, height);
    }
    public maxAspectRatio(width: number, height: number) {
        return new AspectRatioQuery("<=", width, height);
    }

    public colorGamut(type: ColorGamutQuery.Type) {
        return new ColorGamutQuery(type);
    }

    public minColor(bitDepth: number) {
        return new ColorQuery(">=", bitDepth);
    }
    public color(bitDepth: number) {
        return new ColorQuery("==", bitDepth);
    }
    public maxColor(bitDepth: number) {
        return new ColorQuery("<=", bitDepth);
    }

    public minColorIndex(numEntries: number) {
        return new ColorIndexQuery(">=", numEntries);
    }
    public colorIndex(numEntries: number) {
        return new ColorIndexQuery("==", numEntries);
    }
    public maxColorIndex(numEntries: number) {
        return new ColorIndexQuery("<=", numEntries);
    }

    public displayMode(mode: DisplayModeQuery.Mode) {
        return new DisplayModeQuery(mode);
    }

    public dynamicRange(usesDynamicRange: boolean) {
        return new DynamicRangeQuery(usesDynamicRange);
    }

    public forcedColors(usesForcedColors: boolean) {
        return new ForcedColorsQuery(usesForcedColors);
    }

    public grid(usesGrid: boolean) {
        return new GridQuery(usesGrid);
    }

    public minHeight(length: Length) {
        return new HeightQuery(">=", length);
    }
    public height(length: Length) {
        return new HeightQuery("==", length);
    }
    public maxHeight(length: Length) {
        return new HeightQuery("<=", length);
    }

    public hover(canHover: boolean) {
        return new HoverQuery(canHover);
    }

    public invertedColors(usesInvertedColors: boolean) {
        return new InvertedColorsQuery(usesInvertedColors);
    }

    public minMonochrome(bitDepth: number) {
        return new MonochromeQuery(">=", bitDepth);
    }
    public monochrome(bitDepth: number) {
        return new MonochromeQuery("==", bitDepth);
    }
    public maxMonochrome(bitDepth: number) {
        return new MonochromeQuery("<=", bitDepth);
    }

    public orientation(orientation: OrientationQuery.Orientation) {
        return new OrientationQuery(orientation);
    }

    public overflowBlock(overflow: OverflowBlockQuery.Overflow) {
        return new OverflowBlockQuery(overflow);
    }

    public overflowInline(showOverflow: boolean) {
        return new OverflowInlineQuery(showOverflow);
    }

    public pointer(type: PointerQuery.Type) {
        return new PointerQuery(type);
    }

    public prefersColorScheme(colorScheme: PrefersColorSchemeQuery.ColorScheme) {
        return new PrefersColorSchemeQuery(colorScheme);
    }

    public prefersContrast(contrast: PrefersContrastQuery.Contrast) {
        return new PrefersContrastQuery(contrast);
    }

    public minResolution(resolution: Resolution) {
        return new ResolutionQuery(">=", resolution);
    }
    public resolution(resolution: Resolution) {
        return new ResolutionQuery(">=", resolution);
    }
    public maxResolution(resolution: Resolution) {
        return new ResolutionQuery("<=", resolution);
    }

    public scripting(availability: ScriptingQuery.Availability) {
        return new ScriptingQuery(availability);
    }

    public update(type: UpdateQuery.Type) {
        return new UpdateQuery(type);
    }

    public videoDynamicRange(usesDynamicRange: boolean) {
        return new VideoDynamicRangeQuery(usesDynamicRange);
    }

    public minWidth(length: Length) {
        return new WidthQuery(">=", length);
    }
    public width(length: Length) {
        return new WidthQuery("==", length);
    }
    public maxWidth(length: Length) {
        return new WidthQuery("<=", length);
    }

}