"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAlphabet = exports.randomFloat = exports.randomInteger = void 0;
function randomInteger(upper, lower = 0) {
    // error checking
    if (typeof upper !== "number" || typeof lower !== "number")
        return -1;
    if (!Number.isInteger(upper) || !Number.isInteger(lower))
        return -1;
    if (upper < lower)
        return -1;
    const diff = upper - lower;
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
//# sourceMappingURL=random.js.map