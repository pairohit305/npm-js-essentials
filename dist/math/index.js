"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minmax = void 0;
/**
 *
 * @param num input
 * @param min if not provide it will default to NEGATIVE_INFINITY
 * @param max if not provide it will default to POSITIVE_INFINITY
 * @returns
 */
function minmax(num, min, max) {
    min = min === undefined ? Number.NEGATIVE_INFINITY : min;
    max = max === undefined ? Number.POSITIVE_INFINITY : max;
    return Math.min(max, Math.max(min, num));
}
exports.minmax = minmax;
//# sourceMappingURL=index.js.map