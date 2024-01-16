"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickObjectKeys = void 0;
function pickObjectKeys(obj, keys) {
    var info = [];
    function runInfoExtractor(obj, path) {
        if (path === void 0) { path = ""; }
        for (var key in obj) {
            var iPath = path ? path + "." + key : key;
            if (typeof obj[key] == "object") {
                runInfoExtractor(obj[key], iPath);
            }
            else if (keys.includes(key)) {
                info.push({
                    key: key,
                    value: obj[key],
                    path: iPath,
                });
            }
        }
    }
    runInfoExtractor(obj);
    return info;
}
exports.pickObjectKeys = pickObjectKeys;
