"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageMarkdown2Interatable = exports.videoORImage = void 0;
// return video if it's video url formate , image ...
// warning currently only detecting common formats
function videoORImage(link) {
    const response = link.match(/(mp4|jpg|png|jpeg|webp)/g);
    if (response) {
        switch (response[0]) {
            case "mp4":
                return "video";
            default:
                return "image";
        }
    }
    else {
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
 *  ["Text", 0, "Pai has "],
 *  ["Image", 1, "https..*"],
 *  ["Text", 2, "God Power."]
 * ]
 */
function imageMarkdown2Interatable(text) {
    if (typeof text !== "string")
        return [];
    let textCopy1 = text;
    let textCopy2 = text;
    let map = [];
    let mapIndex = 0;
    let iamgeStringCount = 0;
    let lastSearchedIndex = -1;
    textCopy1.replace(/\[image\]\(.+?\)/g, (replacedText) => {
        let key, index, startRange, endRange, value;
        // key
        key = "Image";
        // range
        startRange = textCopy2.indexOf(replacedText, lastSearchedIndex);
        endRange = startRange + replacedText.length - 1;
        // value
        value = replacedText.split("[image](")[1].slice(0, -1);
        // index
        index = iamgeStringCount;
        // trace the before text
        map.push([
            "Text",
            mapIndex,
            textCopy1.slice(lastSearchedIndex + 1, startRange),
        ]);
        mapIndex++;
        map.push([key, mapIndex, value]);
        lastSearchedIndex = endRange;
        iamgeStringCount++;
        mapIndex++;
        return "";
    });
    map.push([
        "Text",
        mapIndex + 1,
        textCopy2.slice(lastSearchedIndex + 1, textCopy2.length),
    ]);
    return map;
}
exports.imageMarkdown2Interatable = imageMarkdown2Interatable;
//# sourceMappingURL=index.js.map