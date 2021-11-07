/**
 * Spliting 1D array into 2D array
 * @param array original array
 * @param into slice into how many parts
 */
export declare function splitArrayInto<T>(array: T[], into: number): T[][];
/** Count the given element in an array */
export declare function arrayElmCounter(list: any[], searcher: any): number;
/**
 * includes++
 * @param array Array of numbers only supported currently
 * @param val Providing only number will act as inbuild includes, but if you want to compare with another array then this option is available too
 */
export declare function containsInArray(array: number[], val: {
    searchElements: number[];
    exact: boolean;
} | number): boolean;
export declare function isDistinctiveArray(array: any[]): boolean;
/**
 * Find the minimum interger in an array
 * @param array
 */
export declare function minArray(array: number[]): number;
/**
 * Find the minimum interger in an array
 * @param array
 */
export declare function maxArray(array: number[]): number;
/**
 * Swap the element in an array
 *
 * Return 1 if operation is successfull and -1 for failture
 */
export declare function swapElmArray(array: any[], indexA: number, indexB: number): 1 | -1;
//# sourceMappingURL=index.d.ts.map