import { Class, Enum, IntersectionOf } from "../util/UtilTypes";

/**
 * A TypeChecker ensures the type of a variable during runtime.
 * @param T type to check for
 */
type TypeChecker<T = any> = (val: any) => val is T;
namespace TypeChecker {

    /**
     * Gets the type checked by a TypeChecker
     * @param Checker TypeChecker
     */
    export type GetType<Checker extends TypeChecker<any>> = Checker extends TypeChecker<infer T> ? T : never;

    export type GetCheckers<A extends any[]> = { [I in keyof A]: TypeChecker<A[I]> };

    export function cast<T>(checker: TypeChecker<T>, expectedTypeName?: string) {
        return (v: any) => {
            if (!checker(v)) throw new TypeError(
                expectedTypeName ?
                    `value ${v} is not of type ${expectedTypeName}` :
                    `value ${v} is of an invalid type`
            );

            return v;
        }
    }

}
export default TypeChecker;



// basics

/** TypeChecker for the `never` type */
export const isNever = ((val: any) => false) as TypeChecker<never>;

/** TypeChecker for the `any` type */
export const isAny = ((val: any) => true) as TypeChecker<any>;



// primitives

/** TypeChecker for the `bigint` type */
export const isBigint: TypeChecker<bigint> = v => typeof v === "bigint";

/** TypeChecker for the `boolean` type */
export const isBoolean: TypeChecker<boolean> = v => typeof v === "boolean";

/** TypeChecker for the `function` type */
export const isFunction = (v => typeof v === "function") as TypeChecker<Function>;

/** TypeChecker for the `null` type */
export const isNull = (v => v === null) as TypeChecker<null>;

/** TypeChecker for the `number` type */
export const isNumber: TypeChecker<number> = v => typeof v === "number";

/** TypeChecker for the `object` type */
export const isObject = (v => typeof v === "object" && v !== null) as TypeChecker<object>;

/** TypeChecker for the `string` type */
export const isString: TypeChecker<string> = v => typeof v === "string";

/** TypeChecker for the `symbol` type */
export const isSymbol: TypeChecker<symbol> = v => typeof v === "symbol";

/** TypeChecker for the `undefined` type */
export const isUndefined = (v => v === undefined) as TypeChecker<null>;



// connectives

/**
 * Gives a TypeChecker that checks for the union of the types checked by `checkers`
 * @param checkers TypeCheckers to create union of
 * @returns TypeChecker for the union of `checkers`
 */
export function getUnionOf<C extends TypeChecker[]>(...checkers: C) {
    return (v => {
        for (const checker of checkers) {
            if (checker(v)) return true;
        }

        return false;
    }) as TypeChecker<TypeChecker.GetType<C[number]>>;
}

/**
 * Gives a TypeChecker that checks for the intersection of the types checked by `checkers`
 * @param checkers TypeCheckers to create intersection of
 * @returns TypeChecker for the intersection of `checkers`
 */
export function getIntersectionOf<C extends TypeChecker[]>(...checkers: C) {
    return (v => checkers.every(v)) as TypeChecker<IntersectionOf<{ [I in keyof C]: TypeChecker.GetType<C[I]> }>>;
}



// higher order

/**
 * Gives a TypeChecker for an array of the type checked by `checker`
 * @param checker TypeChecker to create array checker for
 * @returns TypeChecker for array of `checker`
 */
export function getArrayChecker<T>(checker: TypeChecker<T>) {
    return (v => Array.isArray(v) && v.every(checker)) as TypeChecker<T[]>;
}

/**
 * Gives a TypeChecker for the mapping described by `checkers`
 * @param checkers mapping of keys to TypeCheckers
 * @returns TypeChecker for the mapping described by `checkers`
 */
export function getMappedChecker<M extends Record<string, TypeChecker>>(mapping: M) {
    return (v => {
        if (!isObject(v)) return false; // must be object
        for (const k in mapping) { // check values
            if (!mapping[k](v[k as keyof typeof v])) return false; // value type mismatch
        }

        return true; // all values matched
    }) as TypeChecker<{ [K in keyof M]: TypeChecker.GetType<M[K]> }>;
}

/**
 * Gives a TypeChecker for the Record from the type checked by `keyChecker` to that checked by `valueChecker`
 * @param keyChecker TypeChecker for the Record keys
 * @param valueChecker TypeChecker for the Record value
 * @returns TypeChecker for Record from `keyChecker`'s type to `valueChecker`'s type
 */
export function getRecordChecker<K extends string | number | symbol, V>(keyChecker: TypeChecker<K>, valueChecker: TypeChecker<V>) {
    return (v => isObject(v) && Object.keys(v).every(keyChecker) && Object.values(v).every(valueChecker)) as TypeChecker<Record<K, V>>;
}

/**
 * Gives a TypeChecker for the type of the given literal
 * @param expected exact value to check for
 * @returns TypeChecker for `typeof expected`
 */
export function getLiteralChecker<T extends string | boolean | number | bigint>(expected: T) {
    return (v => v === expected) as TypeChecker<T>;
}



// other

const NUMBER_REGEX = /^-?[0-9]+(\.[0-9]+)?(e-?[0-9]+)?$/;
/**
 * Gives a TypeChecker for an enum instance
 * @param enumType enum to check for instances of
 * @returns TypeChecker for instances of `enumType`
 */
export function getEnumChecker<E extends Enum>(enumType: E) {
    const values = Object.keys(enumType) // extract values from enum
        .filter(k => !NUMBER_REGEX.test(k))
        .map(k => enumType[k as keyof E]);

    return (v => values.includes(v)) as TypeChecker<E[keyof E]>;
}

/**
 * Creates a TypeChecker for instances of the given class
 * @param cls class to check instances of
 * @returns TypeChecker for instances of `cls`
 */
export function getInstanceChecker<T>(cls: Class<T>) {
    return (v => v instanceof cls) as TypeChecker<T>;
}