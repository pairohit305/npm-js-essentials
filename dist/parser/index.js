"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsFuncErrDetector2 = exports.jsFuncErrDetector = exports.jsfuncArgDetector = exports.domaincomDetector = exports.img2DMatrix = exports.videoORImage = void 0;
const url_parse_1 = __importDefault(require("url-parse"));
/**
 *
 * @param link url
 */
function videoORImage(link) {
    try {
        if (typeof link !== "string" || link.length <= 0)
            return null;
        const response = link.match(/(mp4|jpg|png|jpeg|webp)/g);
        if (!response)
            return null;
        switch (response[0]) {
            case "mp4":
                return "VIDEO";
            default:
                return "IMAGE";
        }
    }
    catch (err) {
        return null;
    }
}
exports.videoORImage = videoORImage;
/**
 // prettier-ignore
 * This function convert similar how markdown syntax work!
 *  Before: Pai has [image](https..*)God Power.
 *  After:
 *  [
 *  ["TEXT", 0, "Pai has "],
 *  ["IMAGE", 1, "https..*"],
 *  ["TEXT", 2, "God Power."]
 * ]
 */
function img2DMatrix(text) {
    if (typeof text !== "string")
        return [];
    let textCopy1 = text;
    let textCopy2 = text;
    let map = [];
    let mapIndex = 0;
    let iamgeStringCount = 0;
    let lastSearchedIndex = -1;
    textCopy1.replace(/\[image\]\(.+?\)/g, (replacedText) => {
        let index, startRange, endRange, value;
        // range
        startRange = textCopy2.indexOf(replacedText, lastSearchedIndex);
        endRange = startRange + replacedText.length - 1;
        // value
        value = replacedText.split("[image](")[1].slice(0, -1);
        // index
        index = iamgeStringCount;
        // trace the before text
        map.push(["TEXT", mapIndex, textCopy1.slice(lastSearchedIndex + 1, startRange)]);
        mapIndex++;
        map.push(["IMAGE", mapIndex, value]);
        lastSearchedIndex = endRange;
        iamgeStringCount++;
        mapIndex++;
        return "";
    });
    map.push(["TEXT", mapIndex, textCopy2.slice(lastSearchedIndex + 1, textCopy2.length)]);
    return map;
}
exports.img2DMatrix = img2DMatrix;
// detect the domain with .com
// eg: https://www.instagram.com => instagram
// only detect .com
function domaincomDetector(url) {
    if (typeof url !== "string" || !url.includes(".com"))
        return null;
    try {
        const parser = url_parse_1.default(url, {});
        let hostname = parser.hostname.split(".com")[0];
        if (hostname.includes(".")) {
            const length = hostname.split(".")["length"];
            hostname = hostname.split(".")[length - 1];
        }
        return hostname;
    }
    catch (err) {
        return null;
    }
}
exports.domaincomDetector = domaincomDetector;
/**
 * Detect the argument name of a given function
 * @param func Function
 */
function jsfuncArgDetector(func) {
    // @ts-ignore
    // First match everything inside the function argument parens.
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    // Split the arguments string into an array comma delimited.
    return args
        .split(",")
        .map(function (arg) {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, "").trim();
    })
        .filter(function (arg) {
        // Ensure no undefined values are added.
        return arg;
    });
}
exports.jsfuncArgDetector = jsfuncArgDetector;
function jsFuncErrDetector(typeArr, args, func) {
    const name = func.name;
    Object.values(args).forEach((val, index) => {
        if (typeof val !== typeArr[index]) {
            console.log(`@function:${name} expected @type:${typeArr[index]} for @arg:${jsfuncArgDetector(func)[index]}, but received @type:${typeof val}`);
        }
    });
}
exports.jsFuncErrDetector = jsFuncErrDetector;
function jsFuncErrDetector2(typeArr, args, func) {
    const name = func.name;
    Object.values(args).forEach((val, index) => {
        if (typeof val !== typeArr[index]) {
            console.log(`@function:${name} expected @type:${typeArr[index]} for @arg:${jsfuncArgDetector(func)[index]}, but received @type:${typeof val}`);
        }
    });
}
exports.jsFuncErrDetector2 = jsFuncErrDetector2;
//# sourceMappingURL=index.js.map