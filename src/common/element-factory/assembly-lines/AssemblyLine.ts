import { Primitive } from "../../util/UtilTypes";

abstract class AssemblyLine<E extends HTMLElement = HTMLElement, P extends AssemblyLine.Parameters = {}> {

    protected readonly mold: AssemblyLine.Mold<E, P>;
    protected readonly defaultParameters: P;
    protected readonly steps: AssemblyLine.Step<E, P>[];

    protected addStep(step: AssemblyLine.Step<E, P>): this {
        this.steps.push(step);
        return this;
    }

    public constructor(mold: AssemblyLine.Mold<E, P> | AssemblyLine<E, P>, defaultParameters: P, steps: AssemblyLine.Step<E, P>[] = []) {
        this.mold = mold instanceof AssemblyLine ? () => mold.make() : mold;
        this.defaultParameters = defaultParameters;
        this.steps = steps;
    }

    public abstract copy(): AssemblyLine<E, P>;

    public make(parameters: Partial<P> = {}): E {
        const resolvedParameters: P = { ...parameters, ... this.defaultParameters };

        // apply steps in order
        const out = this.mold(resolvedParameters);
        for (const step of this.steps) step(out, resolvedParameters);
        return out;
    }

}

namespace AssemblyLine {

    export type Parameters = Record<string, any>;

    /**
     * A Mold is a function which creates some type of HTMLElement.
     * @param E specific type of HTMLElement
     */
    export type Mold<E extends HTMLElement = HTMLElement, P extends Parameters = {}> = (params: P) => E;

    /**
     * An Step is a function that modifies the given HTMLElement
     * and returns the result.
     * @param E specific type of HTMLElement
     */
    export type Step<E extends HTMLElement = HTMLElement, P extends Parameters = {}> = (elem: E, params: P) => void;

    export type DynamicValue<V, E extends HTMLElement = HTMLElement, P extends Parameters = {}> = (elem: E, params: P) => V;
    export namespace DynamicValue {

        export type Either<V, E extends HTMLElement = HTMLElement, P extends Parameters = {}> = V | DynamicValue<V, E, P>;

        export function resolve<V extends Primitive | Primitive[], E extends HTMLElement, P extends Parameters>(val: Either<V, E, P>, elem: E, params: P): V {
            return typeof val === "function" ? val(elem, params) : val;
        }

    }

}

export default AssemblyLine;