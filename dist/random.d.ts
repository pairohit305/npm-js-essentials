export declare function randomInteger(config: {
    min: number;
    max: number;
}): number;
export declare function randomUUID(): string;
/**
 *
 * @param dropRates
 * [65, 25, 9, 1] => index0 has 65% drop rate, index1 has 25% and so on
 * [75, 25] => index0 has 75% index1 has 25%
 * [75, 0, 25] => index0 has 75% index1 has 0% index2 has 25%
 * @important sum of dropRates must be equal to 100
 */
export declare class RandomWeightedIndex {
    private dropIndexes;
    private pointer;
    constructor(dropRates: number[]);
    get(): number;
}
//# sourceMappingURL=random.d.ts.map