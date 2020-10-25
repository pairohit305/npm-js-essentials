import parse from "url-parse";

/**
 * Given an url, it will detect weather it's an VIDEO or IMAGE
 * @param url url
 */
export function videoORImage(url: string) {
  try {
    if (typeof url !== "string" || url.length <= 0) return null;

    const response = url.toLowerCase().match(/(mp4|mov|wmv|flv|avi|avchd|webm|mkv|jpg|png|jpeg|webp|gif)/g);
    if (!response) return null;

    switch (response[0]) {
      case "mp4":
      case "mov":
      case "wmv":
      case "flv":
      case "avi":
      case "avchd":
      case "webm":
      case "mkv":
        return "VIDEO";
      case "jpg":
      case "png":
      case "jpeg":
      case "webp":
      case "gif":
        return "IMAGE";
    }
  } catch (err) {
    return null;
  }
}

export function plainText2HTML(text: string) {
  return text.replace(/\n/g, "<br />");
}



type TYPE = "TEXT" | "IMAGE";
type INVDICT = [TYPE, number, string];
type OPDICT = Array<INVDICT>;

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
export function img2DMatrix(text: string): OPDICT {
  if (typeof text !== "string") return [];

  let textCopy1 = text;
  let textCopy2 = text;

  let map: INVDICT[] = [];
  let mapIndex = 0;
  let iamgeStringCount = 0;
  let lastSearchedIndex = -1;
  textCopy1.replace(/\[image\]\(.+?\)/g, (replacedText: string): string => {
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

// detect the domain with .com
// eg: https://www.instagram.com => instagram
// only detect .com
export function domaincomDetector(url: string) {
  if (typeof url !== "string" || !url.includes(".com")) return null;
  try {
    const parser = parse(url, {});
    let hostname = parser.hostname.split(".com")[0];
    if (hostname.includes(".")) {
      const length = hostname.split(".")["length"];
      hostname = hostname.split(".")[length - 1];
    }

    return hostname;
  } catch (err) {
    return null;
  }
}

/**
 * Detect the argument name of a given function
 * @param func Function
 */
// export function jsfuncArgDetector(func: Function) {
//   // @ts-ignore
//   // First match everything inside the function argument parens.
//   var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

//   // Split the arguments string into an array comma delimited.
//   return args
//     .split(",")
//     .map(function (arg) {
//       // Ensure no inline comments are parsed and trim the whitespace.
//       return arg.replace(/\/\*.*\*\//, "").trim();
//     })
//     .filter(function (arg) {
//       // Ensure no undefined values are added.
//       return arg;
//     });
// }

// export function jsFuncErrDetector(
//   typeArr: (
//     | "string"
//     | "number"
//     | "bigint"
//     | "boolean"
//     | "symbol"
//     | "undefined"
//     | "object"
//     | "function"
//   )[],
//   args: IArguments,
//   func: Function
// ) {
//   const name = func.name;
//   Object.values(args).forEach((val, index) => {
//     if (typeof val !== typeArr[index]) {
//       console.log(
//         `@function:${name} expected @type:${typeArr[index]} for @arg:${
//           jsfuncArgDetector(func)[index]
//         }, but received @type:${typeof val}`
//       );
//     }
//   });
// }
// export function jsFuncErrDetector2(
//   typeArr: (
//     | "string"
//     | "number"
//     | "boolean"
//     | "undefined"
//     | "object"
//     | "Array"
//     | "Function"
//     | "function"
//   )[],
//   args: IArguments,
//   func: Function
// ) {
//   const name = func.name;
//   Object.values(args).forEach((val, index) => {
//     if (typeof val !== typeArr[index]) {
//       console.log(
//         `@function:${name} expected @type:${typeArr[index]} for @arg:${
//           jsfuncArgDetector(func)[index]
//         }, but received @type:${typeof val}`
//       );
//     }
//   });
// }
