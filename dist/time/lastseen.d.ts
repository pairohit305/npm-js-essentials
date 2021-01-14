/** 1604247241_000 -> yesterday */
export declare function lastseen(timestamp: number): string;
/**
 *       24h before startDate(STARTS_TOMARROW)                   *
 *                 |                                             *
 *                 |       24h before endDate(ENDS_TODAY)        *
 *                 |                   |                         *
 *                 v                   v                         *
 * (NOT_STARTED)-- * -- * ============ * -- * ------             *
 *                      ^                   ^                    *
 *                      |                   |                    *
 *                      |           endDate(ENDED)               *
 *                      |                                        *
 *         startDate(STARTED_IN_BETWEEN)                         *
 *                                                               *
 *    = Our main event                                           *
 *    * Breakpoint                                               *
 *                                                               *
 */
export declare const TIMELINE_STATUS: {
    NOT_STARTED: number;
    STARTS_TOMARROW: number;
    STARTED_IN_BETWEEN: number;
    ENDS_TODAY: number;
    ENDED: number;
    UNKNOWN: number;
    INVALID: number;
};
export declare class Timeline {
    private startDateString;
    private endDateString;
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
      */
    private SWITCH_SECONDS;
    /**
     * IF you provide number in this, then it will work
     * just like any other countdown ex 20 secs count down
     *
     */
    private COUNTDOWN_SECONDS;
    private text?;
    private startCB?;
    private updateCB?;
    private finishCB?;
    private timer;
    private MODE;
    private STATUS;
    private intervalPeriod;
    private time;
    private timeString;
    constructor(startDateString: string, endDateString: string, 
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
      */
    SWITCH_SECONDS?: number, 
    /**
     * IF you provide number in this, then it will work
     * just like any other countdown ex 20 secs count down
     *
     */
    COUNTDOWN_SECONDS?: number | undefined, text?: {
        NOT_STARTED?: string | undefined;
        STARTS_TOMARROW?: string | undefined;
        ENDS_TODAY?: string | undefined;
        STARTED?: string | undefined;
        ENDED?: string | undefined;
    } | undefined);
    private init;
    static getStatus(startDateString: string, endDateString: string): number;
    private getStatus;
    private updateTime;
    private updateTimeString;
    private setDoubleDigit;
    /** events */
    onStart(callback?: Timeline["startCB"]): void;
    onUpdate(callback?: Timeline["updateCB"]): void;
    onFinish(callback: Timeline["finishCB"]): void;
    /** pause the time */
    pause(): void;
    /** resume the time */
    resume(): void;
    /** start the time */
    start(): void;
    /** stop the time */
    stop(): void;
    /** Restart the timer with new */
    restart(startDateString: string, endDateString: string): void;
}
//# sourceMappingURL=lastseen.d.ts.map