"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
/**XmodY **3mod5=2** */
function mod(X, Y) {
    return Math.round(parseFloat("0." +
        parseFloat((X / Y).toString())
            .toString()
            .split(".")[1]) * Y);
}
exports.mod = mod;
//# sourceMappingURL=mod.js.map