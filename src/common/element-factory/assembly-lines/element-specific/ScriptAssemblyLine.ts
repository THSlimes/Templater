import AssemblyLine from "../AssemblyLine";
import FetchingAssemblyLine from "./FetchingAssemblyLine";

class ScriptAssemblyLine<P extends AssemblyLine.Parameters> extends FetchingAssemblyLine<HTMLScriptElement, P> {

    public override copy(): ScriptAssemblyLine<P> {
        return new ScriptAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLScriptElement, P>[] = []) {
        super(() => document.createElement("script"), defaultParameters, steps);
    }

    public isAsync(isAsync: AssemblyLine.DynamicValue.Either<boolean, HTMLScriptElement, P>) {
        return this.addStep((e, params) => e.async = AssemblyLine.DynamicValue.resolve(isAsync, e, params));
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLScriptElement, P>) {
        return this.addStep((e, params) => {
            const resolved = typeof src === "function" ? src(e, params) : src;
            e.src = resolved instanceof URL ? resolved.href : resolved;
        });
    }

    public type(type: AssemblyLine.DynamicValue.Either<ScriptAssemblyLine.Type, HTMLScriptElement, P>) {
        return this.addStep((e, params) => e.type = AssemblyLine.DynamicValue.resolve(type, e, params));
    }

}

namespace ScriptAssemblyLine {

    export enum Type {
        DEFAULT = "",
        IMPORT_MAP = "importmap",
        MODULE = "module",
        DATA = "data"
    }

}

export default ScriptAssemblyLine;