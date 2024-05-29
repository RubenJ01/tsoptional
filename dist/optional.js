import NoSuchElementError from './noSuchElementError';
/**
 * Container object which may or may not contain a non-null value.
 */
export default class Optional {
    constructor(data) {
        this.value = data;
    }
    /**
     * Create an optional with a value of type T.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified non-null value.
     */
    static of(data) {
        return new Optional(data);
    }
    /**
     * Create an Optional thats empty.
     * @returns An empty Optional instance;
     */
    static empty() {
        return new Optional(null);
    }
    /***
     * Retrieve the value stored inside of the Optional.
     * @returns If a value is present in this Optional, returns the value, otherwise throws exception.
     * @throws NoSuchElementException when this function is called on an empty Optional.
     */
    get() {
        if (this.value == null) {
            throw new NoSuchElementError("Optional contains a null value");
        }
        return this.value;
    }
    /**
     * Execute the given action if a value is present, emptyAction if otherwise.
     * @param Consumer Code to be executed if the value is present.
     * @param Runnable Code to be excuted if the value is not present.
     */
    ifPresentOrElse(action, emptyAction) {
        if (this.isPresent()) {
            action(this.value);
        }
        else {
            emptyAction();
        }
    }
    /**
     * Execute the given action if a value is present.
     * @param Consumer Code to be executed if the value is present.
     */
    ifPresent(action) {
        if (this.isPresent()) {
            action(this.value);
        }
    }
    /**
     * @returns True if there is a value present, otherwise false.
     */
    isPresent() {
        return this.value !== null;
    }
}
//# sourceMappingURL=optional.js.map