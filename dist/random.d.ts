export declare function randomInteger(upper: number, lower?: number): number;
export declare function randomFloat(upper: number, lower?: number, decimal?: number): number;
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
//# sourceMappingURL=random.d.ts.map