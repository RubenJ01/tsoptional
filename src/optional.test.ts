import Optional from "./optional";

describe("Optional", () => {

    const value = "test";
    const consumer = jest.fn();
    const runnable = jest.fn();

    describe("of", () => {
        it("should return an Optional with the given value", () => {
            const sut = Optional.of(value);
            expect(sut.isPresent()).toBe(true);
        });

        it("should throw an error when its given a null value", () => {
            expect(() => Optional.of<string | null>(null)).toThrow();
        })

        it("should throw an error when its given an undefined value", () => {
            expect(() => Optional.of<string | undefined>(undefined)).toThrow();
        })
    });

    describe("ofNullable", () => {
        it("should return an Optional with the given value", () => {
            const sut = Optional.ofNullable(value);
            expect(sut.isPresent()).toBe(true);
        });

        it("should return an empty Optional when its given a null value", () => {
            const sut = Optional.ofNullable(null);
            expect(sut.isPresent()).toBe(false);
        });

        it("should return an empty Optional when its given an undefined value", () => {
            const sut = Optional.ofNullable(undefined);
            expect(sut.isPresent()).toBe(false);
        });
    });

    describe("empty", () => {
        it("should create an empty Optional", () => {
            const sut = Optional.empty();
            expect(sut.isPresent()).toBe(false);
        });
    });

    describe("get", () => {
        it("should return the value stored inside the Optional if its not null or undefined", () => {
            const sut = Optional.of(value);
            expect(sut.get()).toEqual(value);
        });

        it("should throw an error if the Optional is empty", () => {
            const sut = Optional.empty();
            expect(() => {sut.get()}).toThrow();
        });
    });

    describe("ifPresent", () => {
        it("should execute the given consumer if a value is present", () => {
            const sut = Optional.of(value);
            sut.ifPresent((value) => consumer());
            expect(consumer).toHaveBeenCalled();
        });

        it("should not execute the given consumer if the optional is empty", () => {
            const sut = Optional.empty();
            sut.ifPresent((value) => consumer());
            expect(consumer).toHaveBeenCalledTimes(0);
        });
    });

    describe("ifPresentOrElse", () => {
        it("should execute the given consumer if a value is present", () => {
            const sut = Optional.of(value);
            sut.ifPresentOrElse((value) => consumer(), () => runnable());
            expect(consumer).toHaveBeenCalled();
            expect(runnable).toHaveBeenCalledTimes(0);
        });

        it("should execute the given runnable if a value is present", () => {
            const sut = Optional.empty()
            sut.ifPresentOrElse((value) => consumer(), () => runnable());
            expect(runnable).toHaveBeenCalled();
            expect(consumer).toHaveBeenCalledTimes(0);
        });
    });


});
