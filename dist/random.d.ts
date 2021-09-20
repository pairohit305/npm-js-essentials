export declare function randomInteger(upper: number, lower?: number): number;
export declare function randomFloat(upper: number, lower?: number, decimal?: number): number;
/** returns random alphabet from a to z by default if you want to
 * add capital alphabets then set the flag includeCapital to true; */
export declare function randomAlphabet(includeCapital?: boolean): string;
export declare function randomNaturalArray(opt: {
    upper: number;
    count: number;
    distinctive?: boolean;
    /**
     * acceptable values = {x∈ N | x≤ count}
     */
    exclude?: number[];
    sorted?: boolean;
}): number[];
export declare function shuffleArray<T>(array: Array<T>): Array<T>;
/**
 *
 * @param dropRates
 * [65, 25, 9, 1] => index0 has 65% drop rate, index1 has 25% and so on
 * [75, 25] => index0 has 75% index1 has 25%
 * [75, 0, 25] => index0 has 75% index1 has 0% index2 has 25%
 * @important sum of dropRates must be equal to 100
 */
export declare class RandomDropRateIndex {
    private dropIndexes;
    private pointer;
    constructor(dropRates: number[]);
    drop(): number;
}
//# sourceMappingURL=random.d.ts.map