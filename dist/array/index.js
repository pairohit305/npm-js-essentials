"use strict";
/**
 * Spliting 1D array into 2D array
 * @param array original array
 * @param into slice into how many parts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxArray = exports.minArray = exports.isDistinctiveArray = exports.contains = exports.arrayElmCounter = exports.splitArrayInto = void 0;
function splitArrayInto(array, into) {
    const array2d = [];
    let loopCount = Math.ceil(array.length / into);
    for (let i = 0; i < loopCount; i++) {
        array2d.push(array.slice(i * into, i * into + into));
    }
    return array2d;
}
exports.splitArrayInto = splitArrayInto;
/** Count the given element in an array */
function arrayElmCounter(list, searcher) {
    let count = 0;
    list.forEach((elm) => (elm === searcher ? count++ : undefined));
    return count;
}
exports.arrayElmCounter = arrayElmCounter;
/**
 * includes++
 * @param array Array of numbers only supported currently
 * @param val Providing only number will act as inbuild includes, but if you want to compare with another array then this option is available too
 */
function contains(array, val) {
    // not tested yet!
    if (typeof val === "object") {
        const { searchElements = [], exact } = val;
        return exact
            ? searchElements.every((value) => {
                return array.includes(value);
            })
            : searchElements.some((value) => {
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
function isDistinctiveArray(array) {
    return !array.some((value) => {
        return arrayElmCounter(array, value) > 1;
    });
}
exports.isDistinctiveArray = isDistinctiveArray;
/**
 * Find the minimum interger in an array
 * @param array
 */
function minArray(array) {
    let min = Number.MAX_VALUE;
    array.forEach(value => {
        if (value < min)
            min = value;
    });
    return min;
}
exports.minArray = minArray;
/**
 * Find the minimum interger in an array
 * @param array
 */
function maxArray(array) {
    let max = Number.MIN_VALUE;
    array.forEach(value => {
        if (value > max)
            max = value;
    });
    return max;
}
exports.maxArray = maxArray;
//# sourceMappingURL=index.js.map