"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNaturalArray = exports.randomAlphabet = exports.randomFloat = exports.randomInteger = void 0;
const array_1 = require("./array");
function randomInteger(upper, lower = 0) {
    // error checking
    if (typeof upper !== "number" || typeof lower !== "number")
        return -1;
    if (!Number.isInteger(upper) || !Number.isInteger(lower))
        return -1;
    if (upper < lower)
        return -1;
    const diff = upper + 1 - lower;
    return lower + Math.floor(Math.random() * diff);
}
exports.randomInteger = randomInteger;
function randomFloat(upper, lower = 0, decimal = 2) {
    // error checking
    if (typeof upper !== "number" || typeof lower !== "number")
        return -1;
    if (upper < lower)
        return -1;
    const diff = upper - lower;
    return Number((lower + Math.random() * diff).toFixed(decimal));
}
exports.randomFloat = randomFloat;
// returns random alphabet from a to z by default if you want to
// add capital alphabets then set the flag includeCapital to true;
function randomAlphabet(includeCapital = false) {
    const alphabets = includeCapital
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        : "abcdefghijklmnopqrstuvwxyz";
    return alphabets.charAt(randomInteger(includeCapital ? 52 : 26));
}
exports.randomAlphabet = randomAlphabet;
function randomNaturalArray(upper, count, repeat = false, exclude) {
    const array = [];
    if (!repeat && !exclude) {
        for (let i = 0; i < count; i++) {
            let random;
            while (true) {
                random = randomInteger(upper, 1);
                if (!array_1.contains(array, random)) {
                    break;
                }
            }
            array.push(random);
        }
    }
    else if (!repeat && exclude) {
        if (count > upper - exclude.length)
            throw new Error(`randomNaturalArray function expect count to be less than or equal to ${upper - exclude.length} for your requirement`);
        for (let i = 0; i < count; i++) {
            let random;
            while (true) {
                random = randomInteger(upper, 1);
                if (!array_1.contains(array, random) && !exclude.includes(random)) {
                    break;
                }
            }
            array.push(random);
        }
    }
    else if (repeat && !exclude) {
        for (let i = 0; i < count; i++) {
            let random = randomInteger(upper, 1);
            array.push(random);
        }
    }
    else if (repeat && exclude) {
        for (let i = 0; i < count; i++) {
            let random;
            while (true) {
                random = randomInteger(upper, 1);
                if (!exclude.includes(random))
                    break;
            }
            array.push(random);
        }
    }
    return array;
}
exports.randomNaturalArray = randomNaturalArray;
//# sourceMappingURL=random.js.map