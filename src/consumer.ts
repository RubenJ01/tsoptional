export default interface Consumer<T> {
    (value: T): void;
}