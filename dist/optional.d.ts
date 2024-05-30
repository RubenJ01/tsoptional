import Consumer from "./consumer";
import Runnable from "./runnable";
/**
 * Container object which may or may not contain a non-null value.
 */
export default abstract class Optional<T> {
    /**
     * Create an optional with a value of type T.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified non-null value.
     * @throws Error when value is null or undefined.
     */
    static of<T>(value: T): Optional<T>;
    /**
     * Create an optional with a value of type T. If the value is null it creates an empty Optional instead.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified value, or an empty Optional if the value is null.
     */
    static ofNullable<T>(value: T): Optional<T>;
    /**
     * Create an Optional thats empty.
     * @returns An empty Optional instance;
     */
    static empty<T>(): Optional<T>;
    /***
     * Retrieve the value stored inside of the Optional.
     * @returns If a value is present in this Optional, returns the value, otherwise throws exception.
     * @throws Error when this function is called on an empty Optional.
     */
    abstract get(): T;
    /**
     * Execute the given action if a value is present, emptyAction if otherwise.
     * @param Consumer Code to be executed if the value is present.
     * @param Runnable Code to be excuted if the value is not present.
     */
    abstract ifPresentOrElse(action: Consumer<T>, emptyAction: Runnable): void;
    /**
     * Execute the given action if a value is present.
     * @param Consumer Code to be executed if the value is present.
     */
    abstract ifPresent(action: Consumer<T>): void;
    /**
     * @returns True if there is a value present, otherwise false.
     */
    abstract isPresent(): boolean;
}
//# sourceMappingURL=optional.d.ts.map