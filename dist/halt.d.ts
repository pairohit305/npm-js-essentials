/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param couter counter class to keep a eye on
 * @param tobe what you expect counter to be
 * @param options option controls
 */
export declare function halt(couter: HaltCounter, tobe: number, options?: {
    maxTimeout?: number;
    every?: number;
}): Promise<unknown>;
export declare class HaltCounter {
    private initCount;
    private index;
    constructor(initCount: number);
    get count(): number;
    set count(value: number);
}
//# sourceMappingURL=halt.d.ts.map