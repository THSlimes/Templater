export default class MissingAttributeError extends Error {

    public constructor(msg?: string) {
        msg = msg?.trim();
        super(
            msg ?
                "missing attribute: " + msg :
                "missing attribute"
        );
    }

}