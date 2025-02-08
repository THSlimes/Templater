import { ToStringable } from "./UtilTypes";

export default abstract class StringUtil {

    public static capitalize(obj: ToStringable): string {
        const str = obj.toString();

        return str.charAt(0).toUpperCase() + str.substring(1);
    }

}