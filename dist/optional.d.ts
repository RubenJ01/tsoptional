import Consumer from "./consumer";
import Predicate from "./predicate";
import Runnable from "./runnable";
import Supplier from "./supplier";
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
     * Returns the value if its present, otherwise other.
     * @param other The value to return if no value is present.
     * @returns Value or other.
     */
    abstract orElse(other: T): T;
    /**
     * Returns the value if its present, otherwise calls other and returns the result of that function call.
     * @param other The supplier to call if no value is present.
     * @returns Value or result of supplier.
     */
    abstract orElseGet(other: Supplier<T>): T;
    /**
     * Checks if the Optional is not empty.
     * @returns True if there is a value present, otherwise false.
     */
    abstract isPresent(): boolean;
    /**
     * Returns the value as an Optional if it matches the given predicate, EmptyOptional otherwise.
     * @param predicate The predicate you want to compare the given value against.
     * @throws Error if the predicate is null.
     */
    abstract filter(predicate: Predicate<T>): Optional<T>;
    /**
     * Compares the Optional to another one.
     * @param optional The Optional you want it to compare to.
     * @returns True if the two Optionals contain the same value, false if otherwise.
     */
    abstract equals<T>(optional: Optional<T>): boolean;
}
//# sourceMappingURL=optional.d.ts.map