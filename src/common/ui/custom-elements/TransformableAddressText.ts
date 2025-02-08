import Address from "../Address";
import { SyncStateWithAttr, SyncValueWithAttr } from "./CustomElement";
import TransformableString from "./TransformableString";


/**
 * An AddressFormat is a pre-defined labeled way to show/hide certain details
 * of an Address.
 */
export enum AddressFormat {
    /** Enough detail to locate a place within a business */
    BUSINESS_LOCAL = "business-local",
    /** Enough detail to locate a place within a building */
    BUILDING_LOCAL = "building-local",

    /** Business name only */
    BUSINESS = "business",
    /** Building name only */
    BUILDING = "building",
    /** Room name only */
    ROOM = "room",

    /** Business and building */
    VENUE = "venue",
    /** Building, business and address */
    VENUE_ADDRESS = "venue-address",

    /** Everything */
    FULL = "full"
}

export default class TransformableAddressText extends TransformableString {

    @SyncValueWithAttr("address", Address) public address: Address = new Address();
    @SyncStateWithAttr("format", AddressFormat) public format: AddressFormat = AddressFormat.FULL;

    protected override initElement(): void | Promise<void> {
        super.initElement();

        this.onAttributeChanged(["address", "format"], () => {
            this.displayString = this.formatDate(this.address, this.format);
        }, true);

    }


    private formatDate(address: Address, format: AddressFormat): string {
        switch (format) {
            case AddressFormat.BUSINESS_LOCAL:
                return address.format({
                    businessName: true,
                    buildingName: true,
                    roomName: true,

                    atSign: "long"
                });
            case AddressFormat.BUILDING_LOCAL:
                return address.format({
                    buildingName: true,
                    roomName: true,
                    atSign: "short"
                });

            case AddressFormat.BUSINESS:
                return address.format({
                    businessName: true,
                    atSign: "long"
                });
            case AddressFormat.BUILDING:
                return address.format({
                    buildingName: true,
                    atSign: "short"
                });
            case AddressFormat.ROOM:
                return address.format({
                    roomName: true,
                    atSign: "short"
                });

            case AddressFormat.VENUE:
                return address.format({
                    businessName: true,
                    buildingName: true,
                    atSign: "long"
                });
            case AddressFormat.VENUE_ADDRESS:
                return address.format({
                    businessName: true,
                    buildingName: true,
                    streetName: true,
                    houseNumber: true,
                    atSign: "short"
                });

            case AddressFormat.FULL:
                return address.format({
                    businessName: true,
                    buildingName: true,
                    roomName: true,
                    streetName: true,
                    houseNumber: true,
                    postalCode: true,
                    townName: true,
                    atSign: "long"
                });
        }
    }

}

customElements.define("transformable-address-text", TransformableAddressText);