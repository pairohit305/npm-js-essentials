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
function randomNaturalArray(opt) {
    // default
    const modifiers = {
        exclude: (opt === null || opt === void 0 ? void 0 : opt.exclude) || [],
        distinctive: (opt === null || opt === void 0 ? void 0 : opt.distinctive) || false,
        sorted: (opt === null || opt === void 0 ? void 0 : opt.sorted) || false,
    };
    const upper = opt.upper;
    const count = opt.count;
    const { exclude, distinctive, sorted } = modifiers;
    // if count is not more than 0 then return [] no future calculation needed
    if (count <= 0)
        return [];
    // err checking
    if (exclude &&
        (exclude === null || exclude === void 0 ? void 0 : exclude.length) >= 2 &&
        (!array_1.isDistinctiveArray(exclude) ||
            array_1.minArray(exclude) < 1 ||
            array_1.maxArray(exclude) > upper ||
            exclude.length === upper)) {
        throw new Error(`randomNaturalArray function expect values of exclude to be = {x∈ N | x≤ count}`);
    }
    // real code starts here
    const array = [];
    if (distinctive && !(exclude === null || exclude === void 0 ? void 0 : exclude.length)) {
        if (count > upper)
            throw new Error(`randomNaturalArray function expect count ≤ ${upper} for your requirement`);
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
    else if (distinctive && (exclude === null || exclude === void 0 ? void 0 : exclude.length)) {
        if (count > upper - exclude.length)
            throw new Error(`randomNaturalArray function expect count ≤ ${upper - exclude.length} for your requirement`);
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
    else if (!distinctive && !(exclude === null || exclude === void 0 ? void 0 : exclude.length)) {
        for (let i = 0; i < count; i++) {
            let random = randomInteger(upper, 1);
            array.push(random);
        }
    }
    else if (!distinctive && (exclude === null || exclude === void 0 ? void 0 : exclude.length)) {
        if (exclude[0] === 1 && count === 1)
            throw new Error(`randomNaturalArray function expect count ≥ 2 for your requirement`);
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
    return sorted ? array.sort((a, b) => a - b) : array;
}
exports.randomNaturalArray = randomNaturalArray;
//# sourceMappingURL=random.js.map