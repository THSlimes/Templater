import { Class } from "./util/UtilTypes";

type ElementQuery = Record<string, Class<Element>>;
namespace ElementQuery {
    export type Result<Q extends ElementQuery> = {
        [Id in keyof Q]: InstanceType<Q[Id]>
    };

    export function resolve<Q extends ElementQuery>(query: Q): Result<Q> {
        const out = {} as Result<Q>;

        for (const id in query) {
            const element = document.getElementById(id);
            if (!element) throw new Error(`No element with ID "${id}" exists`);
            else if (!(element instanceof query[id])) throw new TypeError(`Element with ID "${id}" is not a ${query[id].name} instance`);
            else out[id] = element as InstanceType<Q[keyof Q]>;
        }

        return out;
    }
}



/**
 * The Loading helper-class allows interfacing with the page loading
 * process more easily.
 */
export default abstract class Loading {

    private static isDOMContentLoaded = false;
    static {
        window.addEventListener("DOMContentLoaded", () => this.isDOMContentLoaded = true);
    }


    /** Gives a promise that resolves once the DOM content is loaded */
    public static onceDOMContentLoaded() {
        if (this.isDOMContentLoaded) return Promise.resolve();
        else return new Promise(resolve => window.addEventListener("DOMContentLoaded", resolve));
    }

    /**
     * Gets multiple Elements from the document by their ids
     * @param query mapping of Element ids to their expected type
     * @returns mapping of Element ids to the elements with those ids
     */
    public static getElementsByID<Q extends ElementQuery = {}>(query: Q = {} as Q): ElementQuery.Result<Q> {
        return ElementQuery.resolve(query);
    }

}