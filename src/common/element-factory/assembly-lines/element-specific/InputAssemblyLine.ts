import { Primitive } from "../../../util/UtilTypes";
import Colors from "../../css-styling/Colors";
import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

class InputAssemblyLine<T extends InputAssemblyLine.Type, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLInputElement, P> {

    protected readonly type: T;

    public override copy(): InputAssemblyLine<T, P> {
        return new InputAssemblyLine(this.type, this.defaultParameters, [...this.steps]);
    }

    constructor(type: T, defaultParameters: P, steps: AssemblyLine.Step<HTMLInputElement, P>[] = []) {
        super(() => { // create input with correct type
            const out = document.createElement("input");
            out.type = type;
            return out;
        }, defaultParameters);

        this.type = type;
    }

    public value(value: AssemblyLine.DynamicValue.Either<InputAssemblyLine.TypedValueFor<T>, HTMLInputElement, P>) {
        return this.addStep((e, params) => e.value = InputAssemblyLine.valueToString(this.type, (typeof value === "function" ? value(e, params) : value)));
    }

    public name(name: AssemblyLine.DynamicValue.Either<Primitive, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.name = String(AssemblyLine.DynamicValue.resolve(name, e, params)));
    }

    public isDisabled(isDisabled: AssemblyLine.DynamicValue.Either<boolean, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.disabled = AssemblyLine.DynamicValue.resolve(isDisabled, e, params));
    }

    public isRequired(isRequired: AssemblyLine.DynamicValue.Either<boolean, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.required = AssemblyLine.DynamicValue.resolve(isRequired, e, params));
    }

}

namespace InputAssemblyLine {

    export enum Type {
        BUTTON = "button",
        CHECKBOX = "checkbox",
        COLOR = "color",
        DATE = "date",
        DATETIME_LOCAL = "datetime-local",
        EMAIL = "email",
        FILE = "file",
        HIDDEN = "hidden",
        IMAGE = "image",
        MONTH = "month",
        NUMBER = "number",
        PASSWORD = "password",
        RADIO = "radio",
        RANGE = "range",
        RESET = "reset",
        SEARCH = "search",
        SUBMIT = "submit",
        TEL = "tel",
        TEXT = "text",
        TIME = "time",
        URL = "url",
        WEEK = "week"
    }

    interface TypeValueMap {
        [Type.BUTTON]: undefined,
        [Type.CHECKBOX]: string,
        [Type.COLOR]: Colors.Hex,
        [Type.DATE]: { day: number, month: number, year: number },
        [Type.DATETIME_LOCAL]: Date,
        [Type.EMAIL]: string,
        [Type.FILE]: string,
        [Type.HIDDEN]: string,
        [Type.IMAGE]: undefined,
        [Type.MONTH]: { monthIndex: number, year: number },
        [Type.NUMBER]: number,
        [Type.PASSWORD]: string,
        [Type.RADIO]: string,
        [Type.RANGE]: number,
        [Type.RESET]: undefined,
        [Type.SEARCH]: string,
        [Type.SUBMIT]: undefined,
        [Type.TEL]: string,
        [Type.TEXT]: string,
        [Type.TIME]: { hours: number, minutes: number },
        [Type.URL]: URL,
        [Type.WEEK]: { week: number, year: number },
    }
    export type TypedValueFor<T extends Type> = TypeValueMap[T];

    interface ValueTranslator<T extends Type> {
        fromString: (str: string) => TypedValueFor<T>,
        toString: (v: TypedValueFor<T>) => string;
    }

    const VALUE_TRANSLATORS: { [T in Type]: ValueTranslator<T> } = Object.freeze({
        [Type.BUTTON]: { fromString: () => undefined, toString: () => "" },
        [Type.CHECKBOX]: { fromString: str => str, toString: v => v },
        [Type.COLOR]: { fromString: str => str as Colors.Hex, toString: v => v },
        [Type.DATE]: {
            fromString: str => {
                const [year, month, day] = str.split('-')
                    .map(p => Number.parseInt(p));
                return { day, month, year };
            },
            toString: v => `${v.year.toString().padStart(4, '0')}-${(v.month + 1).toString().padStart(2, '0')}-${v.day.toString().padStart(2, '0')}`
        },
        [Type.DATETIME_LOCAL]: {
            fromString: str => {
                const [date, time] = str.split('T');

                const [year, month, day] = date.split('-')
                    .map(p => Number.parseInt(p));
                const [hours, minutes] = time.split('-')
                    .map(p => Number.parseInt(p));

                return new Date(year, month - 1, day, hours, minutes);
            },
            toString: v => {
                let iso = v.toISOString();
                if (iso.includes('.')) iso = iso.substring(0, iso.lastIndexOf('.'));
                return iso;
            }
        },
        [Type.EMAIL]: { fromString: str => str, toString: v => v },
        [Type.FILE]: { fromString: str => str, toString: v => v },
        [Type.HIDDEN]: { fromString: str => str, toString: v => v },
        [Type.IMAGE]: { fromString: () => undefined, toString: () => "" },
        [Type.MONTH]: {
            fromString: str => {
                const [year, month] = str.split('-')
                    .map(p => Number.parseInt(p));

                return { monthIndex: month - 1, year };
            },
            toString: v => `${v.year.toString().padStart(4, '0')}-${(v.monthIndex + 1).toString().padStart(2, '0')}`
        },
        [Type.NUMBER]: {
            fromString: str => Number.parseFloat(str),
            toString: v => v.toString()
        },
        [Type.PASSWORD]: { fromString: str => str, toString: v => v },
        [Type.RADIO]: { fromString: str => str, toString: v => v },
        [Type.RANGE]: {
            fromString: str => Number.parseFloat(str),
            toString: v => v.toString()
        },
        [Type.RESET]: { fromString: () => undefined, toString: () => "" },
        [Type.SEARCH]: { fromString: str => str, toString: v => v },
        [Type.SUBMIT]: { fromString: () => undefined, toString: () => "" },
        [Type.TEL]: { fromString: str => str, toString: v => v },
        [Type.TEXT]: { fromString: str => str, toString: v => v },
        [Type.TIME]: {
            fromString: str => {
                const [hours, minutes] = str.split(':')
                    .map(p => Number.parseInt(p));
                return { hours, minutes };
            },
            toString: v => `${v.hours.toString().padStart(2, '0')}:${v.minutes.toString().padStart(2, '0')}`
        },
        [Type.URL]: {
            fromString: str => new URL(str),
            toString: v => v.href
        },
        [Type.WEEK]: {
            fromString: str => {
                const [year, week] = str.split('-W')
                    .map(p => Number.parseInt(p));
                return { year, week };
            },
            toString: v => `${v.year.toString().padStart(4, '0')}-W${v.week.toString().padStart(2, '0')}`
        }
    });
    

    export function valueToString<T extends Type>(type: T, value: TypedValueFor<T>): string {
        return VALUE_TRANSLATORS[type].toString(value);
    }

    export function valueFromString<T extends Type>(type: T, str: string): TypedValueFor<T> {
        return VALUE_TRANSLATORS[type].fromString(str);
    }

    interface TypeAssemblyLineMap<P extends AssemblyLine.Parameters> {
        [Type.BUTTON]: ButtonLikeInputAssemblyLine<Type.BUTTON, P>,
        [Type.CHECKBOX]: CheckableInputAssemblyLine<Type.CHECKBOX, P>,
        [Type.COLOR]: InputAssemblyLine<Type.COLOR, P>,
        [Type.DATE]: NumberLikeInputAssemblyLine<Type.DATE, P>,
        [Type.DATETIME_LOCAL]: NumberLikeInputAssemblyLine<Type.DATETIME_LOCAL, P>,
        [Type.EMAIL]: TextLikeInputAssemblyLine<Type.EMAIL, P>,
        [Type.FILE]: TextLikeInputAssemblyLine<Type.FILE, P>,
        [Type.HIDDEN]: TextLikeInputAssemblyLine<Type.HIDDEN, P>,
        [Type.IMAGE]: ImageInputAssemblyLine<P>,
        [Type.MONTH]: NumberLikeInputAssemblyLine<Type.MONTH, P>,
        [Type.NUMBER]: NumberLikeInputAssemblyLine<Type.NUMBER, P>,
        [Type.PASSWORD]: TextLikeInputAssemblyLine<Type.PASSWORD, P>,
        [Type.RADIO]: CheckableInputAssemblyLine<Type.RADIO, P>,
        [Type.RANGE]: NumberLikeInputAssemblyLine<Type.RANGE, P>,
        [Type.RESET]: ButtonLikeInputAssemblyLine<Type.RESET, P>,
        [Type.SEARCH]: TextLikeInputAssemblyLine<Type.SEARCH, P>,
        [Type.SUBMIT]: ButtonLikeInputAssemblyLine<Type.SUBMIT, P>,
        [Type.TEL]: TextLikeInputAssemblyLine<Type.TEL, P>,
        [Type.TEXT]: TextLikeInputAssemblyLine<Type.TEXT, P>,
        [Type.TIME]: NumberLikeInputAssemblyLine<Type.TIME, P>,
        [Type.URL]: TextLikeInputAssemblyLine<Type.URL, P>,
        [Type.WEEK]: NumberLikeInputAssemblyLine<Type.WEEK, P>
    };

    export const DEFAULT_CREATORS: { [T in Type]: <P extends AssemblyLine.Parameters>(defaultParameters: P) => TypeAssemblyLineMap<P>[T] } = Object.freeze({
        [Type.BUTTON]: dp => new ButtonLikeInputAssemblyLine(Type.BUTTON, dp),
        [Type.CHECKBOX]: dp => new CheckableInputAssemblyLine(Type.CHECKBOX, dp),
        [Type.COLOR]: dp => new InputAssemblyLine(Type.COLOR, dp),
        [Type.DATE]: dp => new NumberLikeInputAssemblyLine(Type.DATE, dp),
        [Type.DATETIME_LOCAL]: dp => new NumberLikeInputAssemblyLine(Type.DATETIME_LOCAL, dp),
        [Type.EMAIL]: dp => new TextLikeInputAssemblyLine(Type.EMAIL, dp),
        [Type.FILE]: dp => new TextLikeInputAssemblyLine(Type.FILE, dp),
        [Type.HIDDEN]: dp => new TextLikeInputAssemblyLine(Type.HIDDEN, dp),
        [Type.IMAGE]: dp => new ImageInputAssemblyLine(dp),
        [Type.MONTH]: dp => new NumberLikeInputAssemblyLine(Type.MONTH, dp),
        [Type.NUMBER]: dp => new NumberLikeInputAssemblyLine(Type.NUMBER, dp),
        [Type.PASSWORD]: dp => new TextLikeInputAssemblyLine(Type.PASSWORD, dp),
        [Type.RADIO]: dp => new CheckableInputAssemblyLine(Type.RADIO, dp),
        [Type.RANGE]: dp => new NumberLikeInputAssemblyLine(Type.RANGE, dp),
        [Type.RESET]: dp => new ButtonLikeInputAssemblyLine(Type.RESET, dp),
        [Type.SEARCH]: dp => new TextLikeInputAssemblyLine(Type.SEARCH, dp),
        [Type.SUBMIT]: dp => new ButtonLikeInputAssemblyLine(Type.SUBMIT, dp),
        [Type.TEL]: dp => new TextLikeInputAssemblyLine(Type.TEL, dp),
        [Type.TEXT]: dp => new TextLikeInputAssemblyLine(Type.TEXT, dp),
        [Type.TIME]: dp => new NumberLikeInputAssemblyLine(Type.TIME, dp),
        [Type.URL]: dp => new TextLikeInputAssemblyLine(Type.URL, dp),
        [Type.WEEK]: dp => new NumberLikeInputAssemblyLine(Type.WEEK, dp)
    });

    export function fromType<T extends Type, P extends AssemblyLine.Parameters>(type: T, defaultParameters: P) {
        return DEFAULT_CREATORS[type](defaultParameters);
    }

}

export default InputAssemblyLine;



export class ButtonLikeInputAssemblyLine<T extends ButtonLikeInputAssemblyLine.Type, P extends AssemblyLine.Parameters> extends InputAssemblyLine<T, P> {

    public override copy(): ButtonLikeInputAssemblyLine<T, P> {
        return new ButtonLikeInputAssemblyLine(this.type, this.defaultParameters, [...this.steps]);
    }

    constructor(type: T, defaultParameters: P, steps: AssemblyLine.Step<HTMLInputElement, P>[] = []) {
        super(type, defaultParameters, steps);
    }

    public override text(text: AssemblyLine.DynamicValue.Either<Primitive, HTMLInputElement, P>): this {
        // set value instead of textContent
        return this.addStep((e, params) => e.value = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

}

namespace ButtonLikeInputAssemblyLine {

    export type Type =
        InputAssemblyLine.Type.BUTTON |
        InputAssemblyLine.Type.RESET |
        InputAssemblyLine.Type.SUBMIT;

}



export class ImageInputAssemblyLine<P extends AssemblyLine.Parameters> extends InputAssemblyLine<InputAssemblyLine.Type.IMAGE, P> {

    public override copy(): ImageInputAssemblyLine<P> {
        return new ImageInputAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLInputElement, P>[] = []) {
        super(InputAssemblyLine.Type.IMAGE, defaultParameters, steps);
    }

    public src(src: AssemblyLine.DynamicValue.Either<string | URL, HTMLInputElement, P>) {
        return this.addStep((e, params) => e.src = String((typeof src === "function" ? src(e, params) : src)));
    }

}



export class TextLikeInputAssemblyLine<T extends TextLikeInputAssemblyLine.Type, P extends AssemblyLine.Parameters> extends InputAssemblyLine<T, P> {

    public override copy(): TextLikeInputAssemblyLine<T, P> {
        return new TextLikeInputAssemblyLine(this.type, this.defaultParameters, [...this.steps]);
    }

    public override text(text: AssemblyLine.DynamicValue.Either<Primitive | URL, HTMLInputElement, P>): this {
        // set value instead of textContent
        return this.addStep((e, params) => e.value = String((typeof text === "function" ? text(e, params) : text)));
    }

    public placeholder(placeholder: AssemblyLine.DynamicValue.Either<Primitive, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.placeholder = String(AssemblyLine.DynamicValue.resolve(placeholder, e, params)));
    }

    public pattern(pattern: AssemblyLine.DynamicValue.Either<RegExp, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.pattern = (typeof pattern === "function" ? pattern(e, params) : pattern).source);
    }

    public minLength(minLength: AssemblyLine.DynamicValue.Either<number, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.minLength = Math.floor(AssemblyLine.DynamicValue.resolve(minLength, e, params)));
    }

    public maxLength(maxLength: AssemblyLine.DynamicValue.Either<number, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.maxLength = Math.floor(AssemblyLine.DynamicValue.resolve(maxLength, e, params)));
    }

}

namespace TextLikeInputAssemblyLine {

    export type Type =
        InputAssemblyLine.Type.EMAIL |
        InputAssemblyLine.Type.FILE |
        InputAssemblyLine.Type.HIDDEN |
        InputAssemblyLine.Type.PASSWORD |
        InputAssemblyLine.Type.SEARCH |
        InputAssemblyLine.Type.TEL |
        InputAssemblyLine.Type.TEXT |
        InputAssemblyLine.Type.URL;

}



export class CheckableInputAssemblyLine<T extends CheckableInputAssemblyLine.Type, P extends AssemblyLine.Parameters> extends InputAssemblyLine<T, P> {

    public override copy(): CheckableInputAssemblyLine<T, P> {
        return new CheckableInputAssemblyLine(this.type, this.defaultParameters, [...this.steps]);
    }

    public isChecked(isChecked: AssemblyLine.DynamicValue.Either<boolean, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.checked = AssemblyLine.DynamicValue.resolve(isChecked, e, params));
    }

}

namespace CheckableInputAssemblyLine {

    export type Type =
        InputAssemblyLine.Type.CHECKBOX |
        InputAssemblyLine.Type.RADIO;

}



export class NumberLikeInputAssemblyLine<T extends NumberLikeInputAssemblyLine.Type, P extends AssemblyLine.Parameters> extends InputAssemblyLine<T, P> {

    public override copy(): NumberLikeInputAssemblyLine<T, P> {
        return new NumberLikeInputAssemblyLine(this.type, this.defaultParameters, [...this.steps]);
    }

    public min(min: AssemblyLine.DynamicValue.Either<InputAssemblyLine.TypedValueFor<T>, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.min = InputAssemblyLine.valueToString(this.type, (typeof min === "function" ? min(e, params) : min)));
    }

    public max(max: AssemblyLine.DynamicValue.Either<InputAssemblyLine.TypedValueFor<T>, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.max = InputAssemblyLine.valueToString(this.type, (typeof max === "function" ? max(e, params) : max)));
    }

    public step(step: AssemblyLine.DynamicValue.Either<number, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.step = AssemblyLine.DynamicValue.resolve(step, e, params).toString());
    }

    public placeholder(placeholder: AssemblyLine.DynamicValue.Either<Primitive, HTMLInputElement, P>): this {
        return this.addStep((e, params) => e.placeholder = String(AssemblyLine.DynamicValue.resolve(placeholder, e, params)));
    }

}

namespace NumberLikeInputAssemblyLine {

    export type Type =
        InputAssemblyLine.Type.NUMBER |
        InputAssemblyLine.Type.RANGE |
        InputAssemblyLine.Type.DATE |
        InputAssemblyLine.Type.DATETIME_LOCAL |
        InputAssemblyLine.Type.MONTH |
        InputAssemblyLine.Type.TIME |
        InputAssemblyLine.Type.WEEK;

}