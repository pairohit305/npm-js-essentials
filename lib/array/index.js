"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitArrayInto = void 0;
function splitArrayInto(array, into) {
    const array2d = [];
    let loopCount = Math.ceil(array.length / into);
    for (let i = 0; i < loopCount; i++) {
        array2d.push(array.slice(i * into, i * into + into));
    }
    return array2d;
}
exports.splitArrayInto = splitArrayInto;
//# sourceMappingURL=index.js.map