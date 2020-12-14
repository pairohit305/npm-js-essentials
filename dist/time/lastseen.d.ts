/** 1604247241_000 -> yesterday */
export declare function lastseen(timestamp: number): string;
export declare const TIMELINE_STATUS: {
    NOT_STARTED: number;
    STARTS_TOMARROW: number;
    STARTED: number;
    ENDS_TODAY: number;
    ENDED: number;
    INVALID: number;
};
interface Timeline {
    status: number;
    value: string;
}
export declare function timeline(startDateString: string, endDateString: string): Timeline;
export {};
//# sourceMappingURL=lastseen.d.ts.map