export default class NoSuchElementError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, NoSuchElementError.prototype);
    }
}