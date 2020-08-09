export declare function videoORImage(link: string): "VIDEO" | "IMAGE" | null;
declare type TYPE = "Text" | "Image";
declare type OPDICT = ([TYPE, number, string] | undefined)[];
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
export declare function imageMarkdown2Interatable(text: string): OPDICT;
export {};
//# sourceMappingURL=index.d.ts.map