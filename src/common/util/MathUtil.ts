export default abstract class MathUtil {

    public static clamp(x: number, lower = -Infinity, upper = Infinity): number {
        if (x < lower) return lower;
        else if (x > upper) return upper;
        else return x;
    }

    /**
     * Calculates the absolute difference between two numbers.
     * @param a first number
     * @param b second number
     * @returns absolute difference between `a` and `b`, i.e. `|a - b|`
     */
    public static absDiff(a: number, b: number) {
        return Math.abs(a - b);
    }

    public static degToRad(deg: number): number {
        return deg / 360 * Math.PI * 2;
    }

    public static radToDeg(rad: number): number {
        return rad / Math.PI / 2 * 360;
    }

}