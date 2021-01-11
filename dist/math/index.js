"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minmax = exports.mod = void 0;
/**XmodY **3mod5=2** */
function mod(X, Y) {
    return Math.round(parseFloat("0." +
        parseFloat((X / Y).toString())
            .toString()
            .split(".")[1]) * Y);
}
exports.mod = mod;
function minmax(num, min, max) {
    return Math.min(max, Math.max(min, num));
}
exports.minmax = minmax;
//# sourceMappingURL=index.js.map