"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStartCase = exports.textLimitor = void 0;
const parser_1 = require("../parser");
function textLimitor(text, limit = 60, content = "...") {
    parser_1.jsFuncErrDetector(["string", "number", "string"], arguments, textLimitor);
    if (text.length > limit) {
        return text.slice(0, limit) + content;
    }
    return text;
}
exports.textLimitor = textLimitor;
function toStartCase(text) {
    if (typeof text !== "string" || !text)
        console.error("string not provided");
    text = text.toLowerCase();
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text;
}
exports.toStartCase = toStartCase;
//# sourceMappingURL=index.js.map