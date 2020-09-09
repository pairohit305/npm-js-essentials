export declare function videoORImage(link: string): "VIDEO" | "IMAGE" | null;
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
//# sourceMappingURL=index.d.ts.map