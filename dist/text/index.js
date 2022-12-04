"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaNumericConvertor = exports.Case = exports.ellipsize = void 0;
function ellipsize(text, limit = 60, content = "...") {
    if (text.length > limit) {
        return text.slice(0, limit) + content;
    }
    return text;
}
exports.ellipsize = ellipsize;
class Case {
    constructor(sentence) {
        this.sentence = sentence;
    }
    /**
     * "type case" 👉 "TYPE CASE"
     */
    toUpperCase() {
        this.sentence = this.sentence.toLocaleUpperCase();
        return this;
    }
    /**
     * "tYpE cASE" 👉 type case"
     */
    toLowerCase() {
        this.sentence = this.sentence.toLocaleLowerCase();
        return this;
    }
    /**
     * "tYpe cAse" 👉 "Type Case"
     */
    toStartCase() {
        const words = this.sentence.split(" ");
        let nSentence = "";
        words.forEach((word, i, { length }) => {
            nSentence +=
                word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
            const isLastWord = i === length - 1;
            if (!isLastWord) {
                nSentence += " "; // add space
            }
        });
        this.sentence = nSentence;
        return this;
    }
    /**
     * "type cAsE" 👉 "typeCase"
     */
    toCamelCase() {
        const words = this.sentence.split(" ");
        let nSentence = "";
        words.forEach((word, i) => {
            // first word lower case
            if (i == 0) {
                nSentence += word.toLocaleLowerCase();
            }
            // second word onward start case
            else {
                nSentence +=
                    word.charAt(0).toLocaleUpperCase() +
                        word.slice(1).toLocaleLowerCase();
            }
        });
        this.sentence = nSentence;
        return this;
    }
    /**
     * "tyPe cAsE" 👉 "TypeCase"
     */
    toPascalCase() {
        const words = this.sentence.split(" ");
        let nSentence = "";
        words.forEach((word) => {
            // every word start case
            nSentence +=
                word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
        });
        this.sentence = nSentence;
        return this;
    }
    /**
     * "tyPe cAsE" 👉 "type_case"
     */
    toSnakeCase() {
        const words = this.sentence.split(" ");
        let nSentence = "";
        words.forEach((word, i, { length }) => {
            nSentence += word.toLocaleLowerCase();
            const isLastWord = i === length - 1;
            if (!isLastWord) {
                nSentence += "_"; // add _
            }
        });
        this.sentence = nSentence;
        return this;
    }
    /**
     * "tyPe cAsE" 👉 "type-case"
     */
    toKebabCase() {
        const words = this.sentence.split(" ");
        let nSentence = "";
        words.forEach((word, i, { length }) => {
            nSentence += word.toLocaleLowerCase();
            const isLastWord = i === length - 1;
            if (!isLastWord) {
                nSentence += "-"; // add -
            }
        });
        this.sentence = nSentence;
        return this;
    }
    get() {
        return this.sentence;
    }
}
exports.Case = Case;
/**
 * a0b#z 👉 a0b35z
 *
 * Char that are not alpha numeric, will be replaced with its char code
 * eg. # => 35
 */
function alphaNumericConvertor(text) {
    let f_text = "";
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        const isAlphaNumeric = char.match(/^[0-9a-zA-Z]/);
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
//# sourceMappingURL=index.js.map