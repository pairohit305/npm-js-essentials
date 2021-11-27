"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyAlphanumeric = exports.toStartCase = exports.toUpperCase = exports.textLimitor = void 0;
function textLimitor(text, limit = 60, content = "...") {
    if (text.length > limit) {
        return text.slice(0, limit) + content;
    }
    return text;
}
exports.textLimitor = textLimitor;
function toUpperCase(text, options) {
    if (options === null || options === void 0 ? void 0 : options.handleUnderscore) {
        text = text.split(" ").join("_");
    }
    text = text.toUpperCase();
    return text;
}
exports.toUpperCase = toUpperCase;
function toStartCase(text, options) {
    if (options === null || options === void 0 ? void 0 : options.handleUnderscore) {
        text = text.split("_").join(" ");
    }
    text = text.toLowerCase();
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text;
}
exports.toStartCase = toStartCase;
function onlyAlphanumeric(text) {
    let f_text = "";
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        const isAlphaNumeric = char.match(/^[0-9a-zA-Z]/);
        // if no alpha numberic then replace it with its char code
        if (!isAlphaNumeric) {
            f_text += char.charCodeAt(0) + "";
        }
        else {
            f_text += char;
        }
    }
    return f_text;
}
exports.onlyAlphanumeric = onlyAlphanumeric;
//# sourceMappingURL=index.js.map