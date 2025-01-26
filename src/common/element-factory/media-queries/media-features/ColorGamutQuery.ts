import EnumerableValueMatchQuery from "../EnumerableValueMatchQuery";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
 */
class ColorGamutQuery extends EnumerableValueMatchQuery<ColorGamutQuery.Type> {

    public constructor(type: ColorGamutQuery.Type) {
        super("color-gamut", type)
    }

}

namespace ColorGamutQuery {

    export enum Type {
        SRGB = "srgb",
        P3 = "p3",
        REC2020 = "rec2020"
    }

}

export default ColorGamutQuery;