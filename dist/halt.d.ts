export declare function halt(tracker: HaltTracker, config?: {
    timeout: number;
    every: number;
}): Promise<unknown>;
export declare class HaltTracker {
    private _status;
    get status(): boolean;
    stop(): void;
}
