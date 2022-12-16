"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function range(number, min, max) {
    return Math.min(max !== null && max !== void 0 ? max : Number.POSITIVE_INFINITY, Math.max(min !== null && min !== void 0 ? min : Number.NEGATIVE_INFINITY, number));
}
exports.range = range;
