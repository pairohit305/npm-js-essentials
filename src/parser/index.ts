import parse from "url-parse";

// return video if it's video url formate , image ...
// warning currently only detecting common formats
export function videoORImage(link: string) {
  try {
    if (typeof link !== "string" || link.length <= 0) return null;

    const response = link.match(/(mp4|jpg|png|jpeg|webp)/g);
    if (!response) return null;

    switch (response[0]) {
      case "mp4":
        return "VIDEO";
      default:
        return "IMAGE";
    }
  } catch (err) {
    return null;
  }
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
