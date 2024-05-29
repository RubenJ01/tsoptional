![NPM Version](https://img.shields.io/npm/v/%40rubenj01%2Ftsoptional) ![GitHub License](https://img.shields.io/github/license/RubenJ01/tsoptional)

# TSOptional
A Java inspired Optional type implemented in TypeScript.

## Installation
```npm
npm i @rubenj01/tsoptional
```

## Why use an Optional?
Here I will list a few advantages of using Optionals in your code.

### 1. Null Safety
Using an Optional handles the absence of a value without using null. Null values in any code are a common source of bugs.
Example:
```ts
function getValue(): string | null {
    if(found) {
        return value;
    }
    return null;
} 
```
The above pseudocode will return the value if its found, and null otherwise. 
If we want to use the value of this function elsewhere we will have to do a nullcheck everywhere its called.
Not only can this be forgotten, it can also lead to null values accidentaly ending up in your code.
We can make this function return an Optional instead:
```ts
function getValue(): Optional<string> {
    if(found) {
        return Optional.of(value);
    }
    return Optional.empty();
} 
```
Now, everytime this function is called and we want to use its value we have to take it out of the Optional, we can do this with the get() function. 
This function will throw an exception if the Optional is empty basically forcing you to check if its empty or not. This can be done with the ifPresent() function:
```ts
let value = getValue();
if(value.isPresent()) {
    console.log(`Optional contains value ${value.get()}`);
} else {
    console.log("Optional is empty");
}
```

### 2. Eliminates null checks
Optional provides methods to deal with the presence or absence of a value, reducing the need for repetitive null checks and making the code cleaner and easier to read.
```ts
let value = getValue();
value.ifPresentOrElse(
    (value) => console.log(`Optional contains value ${value}`), 
    () => console.log("Optional is empty")
);
```

## Usage
**Importing:**
```ts
import { Optional } from "@rubenj01/tsoptional";
```

**Creating an Optional with a value:**
```ts
Optional.of("someValue");
```

**Creating an empty Optional:**
```ts
Optional.empty();
```

**Retrieving a value:**
```ts
Optional.get();
```