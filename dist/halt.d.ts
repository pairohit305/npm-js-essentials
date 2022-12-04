/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param tracker tracker class to keep a eye on
 * @param config option controls
 */
export declare function halt(tracker: HaltTracker, config?: {
    timeout: number;
    every: number;
}): Promise<unknown>;
export declare class HaltTracker {
    private _status;
    get status(): boolean;
    stop(): void;
}
//# sourceMappingURL=halt.d.ts.map