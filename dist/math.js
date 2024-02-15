export function clampInt(number, opts) {
    var _a, _b;
    return Math.min((_a = opts === null || opts === void 0 ? void 0 : opts.max) !== null && _a !== void 0 ? _a : Number.POSITIVE_INFINITY, Math.max((_b = opts === null || opts === void 0 ? void 0 : opts.min) !== null && _b !== void 0 ? _b : Number.NEGATIVE_INFINITY, number));
}
