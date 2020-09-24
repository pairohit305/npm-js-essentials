/**
 *
 * @param link url
 */
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
/**
 * Detect the argument name of a given function
 * @param func Function
 */
export declare function jsfuncArgDetector(func: Function): string[];
export declare function jsFuncErrDetector(typeArr: ("string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function")[], args: IArguments, func: Function): void;
export declare function jsFuncErrDetector2(typeArr: ("string" | "number" | "boolean" | "undefined" | "object" | "Array" | "Function" | "function")[], args: IArguments, func: Function): void;
export {};
//# sourceMappingURL=index.d.ts.map