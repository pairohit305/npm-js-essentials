/**
 * Given an url, it will detect weather it's an VIDEO or IMAGE
 * @param url url
 */
export declare function videoORImage(url: string): "VIDEO" | "IMAGE" | null | undefined;
export declare function plainText2HTML(text: string): string;
declare type TYPE = "TEXT" | "IMAGE";
declare type INVDICT = [TYPE, number, string];
declare type OPDICT = Array<INVDICT>;
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
export declare function img2DMatrix(text: string): OPDICT;
export declare function domaincomDetector(url: string): string | null;
export {};
/**
 * Detect the argument name of a given function
 * @param func Function
 */
//# sourceMappingURL=index.d.ts.map