import Consumer from "./consumer";
import Runnable from "./runnable";
/**
 * Container object which may or may not contain a non-null value.
 */
export default class Optional<T> {
    private value;
    private constructor();
    /**
     * Create an optional with a value of type T.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified non-null value.
     */
    static of<T>(data: T): Optional<T>;
    /**
     * Create an Optional thats empty.
     * @returns An empty Optional instance;
     */
    static empty(): Optional<null>;
    /***
     * Retrieve the value stored inside of the Optional.
     * @returns If a value is present in this Optional, returns the value, otherwise throws exception.
     * @throws NoSuchElementException when this function is called on an empty Optional.
     */
    get(): T;
    /**
     * Execute the given action if a value is present, emptyAction if otherwise.
     * @param Consumer Code to be executed if the value is present.
     * @param Runnable Code to be excuted if the value is not present.
     */
    ifPresentOrElse(action: Consumer<T>, emptyAction: Runnable): void;
    /**
     * Execute the given action if a value is present.
     * @param Consumer Code to be executed if the value is present.
     */
    ifPresent(action: Consumer<T>): void;
    /**
     * @returns True if there is a value present, otherwise false.
     */
    isPresent(): boolean;
}
//# sourceMappingURL=optional.d.ts.map