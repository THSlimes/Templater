import StringUtil from "../util/StringUtil";

/**
 * An Address represents an addressable physical location, e.g. a house or business.
 */
class Address implements Address.Initializer {

    private static readonly DEFAULT_FORMAT: Address.FormatOptions = {
        businessName: false,
        buildingName: false,
        roomName: false,

        streetName: false,
        houseNumber: false,

        postalCode: false,
        townName: false,

        atSign: "none",
    };

    private static SECTION_KEYS: (keyof Address.Initializer)[][] = [
        ["businessName", "buildingName", "roomName"],
        ["streetName", "houseNumber"],
        ["postalCode", "townName"]
    ];



    public businessName: string;
    public buildingName: string;
    public roomName: string;

    public streetName: string;
    public houseNumber: string;

    public postalCode: string;
    public townName: string;


    /**
     * Creates a new Address object.
     * @param init object containing options address details. Unspecified details
     * will be left blank
     */
    public constructor(init: Partial<Address.Initializer> = {}) {
        this.businessName = init.businessName ?? "";
        this.buildingName = init.buildingName ?? "";
        this.roomName = init.roomName ?? "";

        this.streetName = init.streetName ?? "";
        this.houseNumber = init.houseNumber ?? "";

        this.postalCode = init.postalCode ?? "";
        this.townName = init.townName ?? "";
    }

    private formatField<F extends keyof Address.Initializer>(fieldName: F, fieldValue: Address.Initializer[F]): string {
        switch (fieldName) {
            case "businessName":
            case "buildingName":
            case "streetName":
            case "townName":
                return StringUtil.capitalize(fieldValue);
            case "postalCode":
                return fieldValue.toString().toUpperCase();
            default:
                return fieldValue.toString();
        }
    }

    /**
     * Formats the Address using certain options.
     * @param format formatting options
     * @returns this Address formatted according to the options
     */
    public format(format: Partial<Address.FormatOptions>) {
        const resolvedFormat = { ...Address.DEFAULT_FORMAT, ...format };

        let out = "";

        switch (resolvedFormat.atSign) {
            case "long":
                out += "At ";
                break;
            case "short":
                out += "@ ";
                break;
        }

        for (const section of Address.SECTION_KEYS) {
            if (section.some(n => resolvedFormat[n])) {
                out += section.filter(n => resolvedFormat[n])
                    .map(n => this.formatField(n, this[n]))
                    .join(' ')
                    .trim();
                out += ", ";
            }
        }

        out = out.trim();
        while (out.endsWith(',')) out = out.slice(0, -1).trim();
        while (out.includes("  ")) out = out.replaceAll("  ", ' ');

        return out;
    }

    private toJSON(): Address.Initializer {
        return {
            businessName: this.businessName,
            buildingName: this.buildingName,
            roomName: this.roomName,
            streetName: this.streetName,
            houseNumber: this.houseNumber,
            postalCode: this.postalCode,
            townName: this.townName,
        };
    }

    public toString() {
        return JSON.stringify(this.toJSON());
    }


    /**
     * Creates an Address object from a stringified JSON object of
     * an Address Initializer
     * @param str stringified JSON of Initializer
     * @returns Address encoded by `str`
     */
    public static fromString(str: string): Address {
        return new Address(JSON.parse(str));
    }

}

namespace Address {

    export interface Initializer {
        /** Name of the business/organization */
        businessName: string;
        /** Name of the building within the business/organization */
        buildingName: string;
        /** Room within the building */
        roomName: string;

        /** Name of the street */
        streetName: string;
        /** Number of the house/building */
        houseNumber: string;

        /** Postal code of the building */
        postalCode: string;
        /** Name of the town */
        townName: string;
    }

    export type FormatOptions = {
        [K in keyof Initializer]: boolean
    } & {
        atSign: "long" | "short" | "none",
    }

}

export default Address;