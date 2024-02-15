export function pickObjectKeys(obj, keys) {
    const info = [];
    function runInfoExtractor(obj, path = "") {
        for (const key in obj) {
            const iPath = path ? path + "." + key : key;
            if (typeof obj[key] == "object") {
                runInfoExtractor(obj[key], iPath);
            }
            else if (keys.includes(key)) {
                info.push({
                    key,
                    value: obj[key],
                    path: iPath,
                });
            }
        }
    }
    runInfoExtractor(obj);
    return info;
}
