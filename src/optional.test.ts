import Optional from "./optional";

describe("Optional", () => {

    const testValue = "test";

    const consumer = jest.fn();
    const runnable = jest.fn();
    const predicate = jest.fn();

    describe("of", () => {
        it("should return an Optional with the given value", () => {
            const sut = Optional.of(testValue);
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
            const sut = Optional.ofNullable(testValue);
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
            const sut = Optional.of(testValue);
            expect(sut.get()).toEqual(testValue);
        });

        it("should throw an error if the Optional is empty", () => {
            const sut = Optional.empty();
            expect(() => { sut.get() }).toThrow();
        });
    });

    describe("ifPresent", () => {
        it("should execute the given consumer if a value is present", () => {
            const sut = Optional.of(testValue);
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
            const sut = Optional.of(testValue);
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

    describe("filter", () => {
        it("should return the value as an Optional if its present and matches the predicate", () => {
            let sut = Optional.of(testValue);
            let filteredValue = sut.filter((value) => value == testValue).get();
            expect(filteredValue).toEqual(testValue);
        });

        it("should not call the predicate if the Optional is empty", () => {
            let sut = Optional.empty();
            sut.filter(predicate);
            expect(predicate).toHaveBeenCalledTimes(0);
        });

        it("should return an empty Optional if the predicate returns false", () => {
            let sut = Optional.of(testValue);
            let filteredValue = sut.filter(() => false);
            expect(filteredValue.isPresent()).toBe(false);
        })
    });

    describe("equals", () => {
        it("should return true when its comparing two Optionals with the same value", () => {
            let sut = Optional.of(testValue);
            expect(sut.equals(Optional.of(testValue))).toBe(true);
            sut = Optional.empty();
            expect(sut.equals(Optional.empty())).toBe(true);
        });

        it("should return false when its comparing two Optionals with different values", () => {
            let sut = Optional.of(testValue);
            expect(sut.equals(Optional.of(testValue + testValue))).toBe(false);
            expect(sut.equals(Optional.empty())).toBe(false);
            expect(sut.equals(Optional.of(5))).toBe(false);
            sut = Optional.of("5");
            expect(sut.equals(Optional.of(5))).toBe(false);
        });
    });

    describe("orElse", () => {
        it("should return the value if its present", () => {
            let sut = Optional.of(testValue);
            expect(sut.orElse("other")).toBe(testValue);
        });

        it("should return other if no value is present", () => {
            let sut = Optional.empty();
            expect(sut.orElse(testValue)).toBe(testValue);
        });
    });

    describe("orElseGet", () => {
        it("should return the value if its present", () => {
            let sut = Optional.of(testValue);
            expect(sut.orElseGet(() => "test")).toBe(testValue);
        });

        it("should return the result of other if no value is present", () => {
            let sut = Optional.empty();
            expect(sut.orElseGet(() => testValue)).toBe(testValue);
        });
    });

    describe("orElseThrow", () => {
        it("should return the value if its present", () => {
            let sut = Optional.of(testValue);
            expect(sut.orElseThrow(() => {throw new Error()})).toBe(testValue);
        });

        it("should throw an errror if no value is present", () => {
            let sut = Optional.empty();
            expect(() => {sut.orElseThrow(() => {return new Error();})}).toThrow(Error);
        });
    });
});
