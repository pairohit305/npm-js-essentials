"use strict";
/**
 * Spliting 1D array into 2D array
 * @param array original array
 * @param into slice into how many parts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = exports.splitArrayInto = void 0;
function splitArrayInto(array, into) {
    const array2d = [];
    let loopCount = Math.ceil(array.length / into);
    for (let i = 0; i < loopCount; i++) {
        array2d.push(array.slice(i * into, i * into + into));
    }
    return array2d;
}
exports.splitArrayInto = splitArrayInto;
/**
 * includes++
 * @param array Array of numbers only supported currently
 * @param val Providing only number will act as inbuild includes, but if you want to compare with another array then this option is available too
 */
function contains(array, val) {
    if (typeof val === "object") {
        const { searchElements: searchElement, exact } = val;
        if (searchElement.length <= 0)
            throw new Error("contains function expects searchElement length more than 1");
        return exact
            ? searchElement.every((value) => {
                return array.includes(value);
            })
            : searchElement.some((value) => {
                return array.includes(value);
            });
    }
    else if (typeof val === "number") {
        return array.includes(val);
    }
    else {
        throw new Error("contains function expects typeof val to be Object or Number");
    }
}
exports.contains = contains;
//# sourceMappingURL=index.js.map