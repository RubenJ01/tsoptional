/**
 * Container object which may or may not contain a non-null value.
 */
export default class Optional {
    /**
     * Create an optional with a value of type T.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified non-null value.
     * @throws Error when value is null or undefined.
     */
    static of(value) {
        if (value == null || value == undefined) {
            throw new TypeError("Value can't be null or undefined");
        }
        return new PresentOptional(value);
    }
    /**
     * Create an optional with a value of type T. If the value is null it creates an empty Optional instead.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified value, or an empty Optional if the value is null.
     */
    static ofNullable(value) {
        if (value == null || value == undefined) {
            return new EmptyOptional();
        }
        return new PresentOptional(value);
    }
    /**
     * Create an Optional thats empty.
     * @returns An empty Optional instance;
     */
    static empty() {
        return new EmptyOptional();
    }
}
class EmptyOptional extends Optional {
    constructor() {
        super();
    }
    get() {
        throw new Error("Optional is empty");
    }
    ifPresentOrElse(action, emptyAction) {
        emptyAction();
    }
    ifPresent(action) {
        return;
    }
    isPresent() {
        return false;
    }
}
class PresentOptional extends Optional {
    constructor(value) {
        super();
        this.value = value;
    }
    get() {
        return this.value;
    }
    ifPresentOrElse(action, emptyAction) {
        action(this.value);
    }
    ifPresent(action) {
        action(this.value);
    }
    isPresent() {
        return true;
    }
}
//# sourceMappingURL=optional.js.map