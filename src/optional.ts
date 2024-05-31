import Consumer from "./consumer";
import Predicate from "./predicate";
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
    public static of<T>(value: T): Optional<T> {
        if(value == null || value == undefined) {
            throw new TypeError("Value can't be null or undefined")
        }
        return new PresentOptional<T>(value);
    }

    /**
     * Create an optional with a value of type T. If the value is null it creates an empty Optional instead.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified value, or an empty Optional if the value is null.
     */
    public static ofNullable<T>(value: T): Optional<T> {
        if(value == null || value == undefined) {
            return new EmptyOptional();
        }
        return new PresentOptional<T>(value);
    }

    /**
     * Create an Optional thats empty.
     * @returns An empty Optional instance;
     */
    public static empty<T>(): Optional<T> {
        return new EmptyOptional();
    }

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

class EmptyOptional<T> extends Optional<T> {
    
    constructor() {
        super();
    }

    get(): T {
        throw new Error("Optional is empty");
    }

    ifPresentOrElse(action: Consumer<T>, emptyAction: Runnable): void {
        emptyAction();
    }

    ifPresent(action: Consumer<T>): void {
        return;
    }

    orElse(other: T): T {
        return other;
    }

    isPresent(): boolean {
        return false;
    }

    filter(predicate: Predicate<T>): Optional<T> {
        return new EmptyOptional();
    }

    equals<T>(optional: Optional<T>): boolean {
        return !optional.isPresent();
    }
}

class PresentOptional<T> extends Optional<T> {

    private value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }

    get(): T {
        return this.value;
    }

    ifPresentOrElse(action: Consumer<T>, emptyAction: Runnable): void {
        action(this.value);
    }

    ifPresent(action: Consumer<T>): void {
        action(this.value);
    }

    orElse(other: T): T {
        return this.value;
    }

    isPresent(): boolean {
        return true;
    }

    filter(predicate: Predicate<T>): Optional<T> {
        if(predicate(this.value)) {
            return this;
        }
        return new EmptyOptional();
    }

    equals<T>(optional: Optional<T>): boolean {
        if(!optional.isPresent() || !optional.isPresent() || !(typeof this.value === typeof optional.get())) {
            return false;
        }
        return (this.value as unknown as T) == (optional.get() as T);
    }
}