export function pickObjectKeys(obj: object, keys: string[]) {
  const info: {
    key: string;
    value: string;
    path: string;
  }[] = [];

  function runInfoExtractor(obj: any, path = "") {
    for (const key in obj) {
      const iPath = path ? path + "." + key : key;

      if (typeof obj[key] == "object") {
        runInfoExtractor(obj[key], iPath);
      } else if (keys.includes(key)) {
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
