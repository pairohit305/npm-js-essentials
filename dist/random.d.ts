export declare function randomInteger(config: {
    min: number;
    max: number;
}): number;
export declare class RandomWeightedIndex {
    private dropIndexes;
    private pointer;
    constructor(dropRates: number[]);
    get(): number;
}
