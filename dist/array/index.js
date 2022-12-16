"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.splitArrayInto = void 0;
function splitArrayInto(array, into) {
    var array2d = [];
    var loopCount = Math.ceil(array.length / into);
    for (var i = 0; i < loopCount; i++) {
        array2d.push(array.slice(i * into, i * into + into));
    }
    return array2d;
}
exports.splitArrayInto = splitArrayInto;
function shuffleArray(array) {
    var _a;
    array = __spreadArray([], array, true);
    var currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
