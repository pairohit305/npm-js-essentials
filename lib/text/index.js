"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textLimitor = void 0;
function textLimitor(text, limit = 60) {
    if (!text)
        return "";
    if (text.length > limit) {
        return text.slice(0, limit) + "...";
    }
    return text;
}
exports.textLimitor = textLimitor;
//# sourceMappingURL=index.js.map