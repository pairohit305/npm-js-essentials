"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaNumericConvertor = exports.ellipsize = void 0;
function ellipsize(text, limit, content) {
    if (limit === void 0) { limit = 60; }
    if (content === void 0) { content = "..."; }
    if (text.length > limit) {
        return text.slice(0, limit) + content;
    }
    return text;
}
exports.ellipsize = ellipsize;
function alphaNumericConvertor(text) {
    var f_text = "";
    for (var index = 0; index < text.length; index++) {
        var char = text[index];
        var isAlphaNumeric = char.match(/^[0-9a-zA-Z]/);
        if (!isAlphaNumeric) {
            f_text += char.charCodeAt(0) + "";
        }
        else {
            f_text += char;
        }
    }
    return f_text;
}
exports.alphaNumericConvertor = alphaNumericConvertor;
