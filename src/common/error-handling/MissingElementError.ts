export default class MissingElementError extends Error {

    public constructor(msg?: string) {
        msg = msg?.trim();
        super(
            msg ?
                "missing element: " + msg :
                "missing element"
        );
    }

}