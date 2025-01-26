/** Represents an object that can be converted to a string */
export interface ToStringable {
    toString(): string
}

/** Union type of primitive values */
export type Primitive = number | bigint | string | boolean | null | undefined;

/** Type of classes with a non-abstract constructor */
export type NonAbstractClass<T> = new (...args: any[]) => T;
/** Type of classes with an abstract constructor */
export type AbstractClass<T> = abstract new (...args: any[]) => T;
/** Type of classes with any kind of constructor */
export type Class<T> = NonAbstractClass<T> | AbstractClass<T>;

/**
 * Gives the intersection of the elements of `Tuple`.
 * @param Tuple tuple type
 */
export type IntersectionOf<T extends any[]> = T extends [infer First, ...infer Rest] ?
    First & IntersectionOf<Rest> :
    unknown;

/** Type of an enum */
export type Enum = Record<string, string | number>;