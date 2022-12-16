"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaNumericConvertor = exports.Case = exports.ellipsize = void 0;
function ellipsize(text, limit, content) {
    if (limit === void 0) { limit = 60; }
    if (content === void 0) { content = "..."; }
    if (text.length > limit) {
        return text.slice(0, limit) + content;
    }
    return text;
}
exports.ellipsize = ellipsize;
var Case = (function () {
    function Case(sentence) {
        this.sentence = sentence;
    }
    Case.prototype.toUpperCase = function () {
        this.sentence = this.sentence.toLocaleUpperCase();
        return this;
    };
    Case.prototype.toLowerCase = function () {
        this.sentence = this.sentence.toLocaleLowerCase();
        return this;
    };
    Case.prototype.toStartCase = function () {
        var words = this.sentence.split(" ");
        var nSentence = "";
        words.forEach(function (word, i, _a) {
            var length = _a.length;
            nSentence +=
                word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
            var isLastWord = i === length - 1;
            if (!isLastWord) {
                nSentence += " ";
            }
        });
        this.sentence = nSentence;
        return this;
    };
    Case.prototype.toCamelCase = function () {
        var words = this.sentence.split(" ");
        var nSentence = "";
        words.forEach(function (word, i) {
            if (i == 0) {
                nSentence += word.toLocaleLowerCase();
            }
            else {
                nSentence +=
                    word.charAt(0).toLocaleUpperCase() +
                        word.slice(1).toLocaleLowerCase();
            }
        });
        this.sentence = nSentence;
        return this;
    };
    Case.prototype.toPascalCase = function () {
        var words = this.sentence.split(" ");
        var nSentence = "";
        words.forEach(function (word) {
            nSentence +=
                word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
        });
        this.sentence = nSentence;
        return this;
    };
    Case.prototype.toSnakeCase = function () {
        var words = this.sentence.split(" ");
        var nSentence = "";
        words.forEach(function (word, i, _a) {
            var length = _a.length;
            nSentence += word.toLocaleLowerCase();
            var isLastWord = i === length - 1;
            if (!isLastWord) {
                nSentence += "_";
            }
        });
        this.sentence = nSentence;
        return this;
    };
    Case.prototype.toKebabCase = function () {
        var words = this.sentence.split(" ");
        var nSentence = "";
        words.forEach(function (word, i, _a) {
            var length = _a.length;
            nSentence += word.toLocaleLowerCase();
            var isLastWord = i === length - 1;
            if (!isLastWord) {
                nSentence += "-";
            }
        });
        this.sentence = nSentence;
        return this;
    };
    Case.prototype.get = function () {
        return this.sentence;
    };
    return Case;
}());
exports.Case = Case;
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
