import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default abstract class TableCellAssemblyLine<E extends HTMLTableCellElement, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTableCellElement, P> {

    public abbreviation(abbreviation: AssemblyLine.DynamicValue.Either<string, HTMLTableCellElement, P>) {
        return this.addStep((e, params) => e.abbr = String(AssemblyLine.DynamicValue.resolve(abbreviation, e, params)));
    }

    public rowSpan(rowSpan: AssemblyLine.DynamicValue.Either<number, HTMLTableCellElement, P>) {
        return this.addStep((e, params) => e.rowSpan = Math.max(1, AssemblyLine.DynamicValue.resolve(rowSpan, e, params)));
    }

    public columnSpan(columnSpan: AssemblyLine.DynamicValue.Either<number, HTMLTableCellElement, P>) {
        return this.addStep((e, params) => e.colSpan = Math.max(1, AssemblyLine.DynamicValue.resolve(columnSpan, e, params)));
    }

}