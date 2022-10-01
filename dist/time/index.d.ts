export declare class DateII {
    static ISO(options?: {
        time?: string;
        representation?: `time` | `dime`;
        modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
    }): string;
    static timestamp(options?: {
        modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
    }): number;
    static DWM(): string;
    static parseDWM(DWM: string): {
        D: number;
        W: number;
        M: number;
    };
    static dateToTime(date: Date): string;
    static dimeToTimestamp(dime: string): number;
    static timeToDime(time: string): string;
    static timeToDate(time: string): Date;
    static timeToInputDate(time: string): string;
    static timeToInputDateTime(time: string): string;
    static timeToTimestamp(time: string): number;
    static timestampToTime(timestamp: number): string;
}
export declare const TIMELINE_STATUS: {
    NOT_STARTED: number;
    STARTS_SOON: number;
    STARTED_IN_BETWEEN: number;
    ENDS_SOON: number;
    ENDED: number;
    UNKNOWN: number;
};
/**
 *
 * Important:
 * All timeline is based on GMT
 *
 * This Timeline class is only dynamic when
 * less 24 hours remaining, for rest case static
 * time values is shown.
 *
 * Eg: if 5 days is the timeline the output will
 *     be "Ends in 5d"
 * BUT if 24h is only remaining then output will
 *     be like "7h 23m" ... after 1 min "7h 22m"
 *     and so on ...
 */
export declare class Timeline {
}
//# sourceMappingURL=index.d.ts.map