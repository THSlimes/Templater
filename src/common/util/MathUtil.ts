export default abstract class MathUtil {

    public static clamp(x: number, lower = -Infinity, upper = Infinity): number {
        if (x < lower) return lower;
        else if (x > upper) return upper;
        else return x;
    }

}