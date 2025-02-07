import { SyncStateWithAttr, SyncValueWithAttr } from "./CustomElement";
import TransformableString from "./TransformableString";


export enum DateFormat {
    DEFAULT = "default"
}

export default class TransformableDatetimeText extends TransformableString {

    private static readonly LOCALE = new Intl.Locale("en-us");



    @SyncValueWithAttr("date", { fromString: str => new Date(str), toString: d => d.toISOString() }) public date: Date = new Date();
    @SyncStateWithAttr("format", DateFormat, DateFormat.DEFAULT) public format: DateFormat = DateFormat.DEFAULT;

    protected override initElement(): void | Promise<void> {
        super.initElement();

        this.onAttributeChanged(["date", "format"], () => {
            this.displayString = this.formatDate(this.date, this.format);
        }, true);

    }


    private formatDate(date: Date, format: DateFormat): string {

        switch (format) {
            case DateFormat.DEFAULT:
                return date.toLocaleDateString(TransformableDatetimeText.LOCALE, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "numeric",
                }).replaceAll(',', "").toUpperCase();
        }
    }

}

customElements.define("transformable-datetime-text", TransformableDatetimeText);