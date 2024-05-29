import Consumer from "./consumer";
import Runnable from "./runnable";
import NoSuchElementError from './noSuchElementError';

/**
 * Container object which may or may not contain a non-null value.
 */
export default class Optional<T> {

    private value: T;

    private constructor(data: T) {
        this.value = data;
    }

    /**
     * Create an optional with a value of type T.
     * @param data The value that will be saved inside the Optional.
     * @returns An Optional with the specified non-null value.
     */
    public static of<T>(data: T): Optional<T> {
        return new Optional<T>(data);
    }

    /**
     * Create an Optional thats empty.
     * @returns An empty Optional instance;
     */
    public static empty(): Optional<null> {
        return new Optional<null>(null);
    }

    /*** 
     * Retrieve the value stored inside of the Optional.
     * @returns If a value is present in this Optional, returns the value, otherwise throws exception.
     * @throws NoSuchElementException when this function is called on an empty Optional.
     */
    public get(): T {
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
    public ifPresentOrElse(action: Consumer<T>, emptyAction: Runnable): void {
        if (this.isPresent()) {
            action(this.value);
        } else {
            emptyAction();
        }
    }

    /**
     * Execute the given action if a value is present.
     * @param Consumer Code to be executed if the value is present.
     */
    public ifPresent(action: Consumer<T>): void {
        if (this.isPresent()) {
            action(this.value);
        }
    }

    /**
     * @returns True if there is a value present, otherwise false.
     */
    public isPresent(): boolean {
        return this.value !== null;
    }
}