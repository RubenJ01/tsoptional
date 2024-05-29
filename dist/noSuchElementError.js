export default class NoSuchElementError extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, NoSuchElementError.prototype);
    }
}
//# sourceMappingURL=noSuchElementError.js.map