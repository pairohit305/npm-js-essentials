export declare function halt(tracker: HaltTracker): Promise<unknown>;
export declare class HaltTracker {
    _resolveFn: null | Function;
    stop(): void;
}
