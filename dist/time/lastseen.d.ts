/** 1604247241_000 -> yesterday */
export declare function lastseen(timestamp: number): string;
export declare const TIMELINE_STATUS: {
    NOT_STARTED: number;
    STARTS_TOMARROW: number;
    STARTED_IN_BETWEEN: number;
    ENDS_TODAY: number;
    ENDED: number;
    UNKNOWN: number;
    INVALID: number;
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
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
     */
    private SWITCH_SECONDS;
    /**
     * All time related is based on GMT if you
     * want add some init delays before calulating
     * go ahead and add it
     */
    private INITIAL_DELAY;
    private replacer;
    private STATUS;
    private MODE;
    private time;
    private interval;
    private timeString;
    private startD;
    private endD;
    private intervaler;
    constructor(startDateString: string, endDateString: string, 
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
     */
    SWITCH_SECONDS?: number, 
    /**
     * All time related is based on GMT if you
     * want add some init delays before calulating
     * go ahead and add it
     */
    INITIAL_DELAY?: number, replacer?: string[]);
    private sleep;
    private start;
    private update;
    private finish;
    restart(startDateString: string, endDateString: string): void;
    /** Call this function to stop the timeline
     *  and clear all timers
     */
    private kill;
    private _onStart?;
    onStart(callback: Function): {
        onUpdate: (callback: (result: {
            time: string;
            status: number;
        }) => any) => {
            onFinish: (callback: Function) => {
                start: (nolog?: boolean) => () => void;
            };
            start: () => () => void;
        };
        start: () => () => void;
    };
    private _onUpdate?;
    onUpdate(callback: (result: {
        time: string;
        status: number;
    }) => any): {
        onFinish: (callback: Function) => {
            start: (nolog?: boolean) => () => void;
        };
        start: () => () => void;
    };
    private _onFinish?;
    onFinish(callback: Function): {
        start: (nolog?: boolean) => () => void;
    };
    private toDoubleDigit;
    private getMode;
    static getStatus(startDateString: string, endDateString: string): number;
}
//# sourceMappingURL=lastseen.d.ts.map