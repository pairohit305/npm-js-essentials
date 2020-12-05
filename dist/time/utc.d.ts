/** op: Wed, 02 Dec 2020 05:47:41 GMT */
export declare function utcDate(): string;
/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
export declare function dateString(dayModifier?: number): string;
/** 1604247241_000 -> 20201202*/
export declare function toDateString(timestamp: number): string;
export declare function toLateDate(dateString: string): string;
export declare function toEarlyDate(dateString: string): string;
export declare function timestamp(dateString?: string, 
/** output in seconds  */
s?: boolean): number;
/**
 * Returns the differences in days between two dateString in days
 * @param dateStringA dateString
 * @param dateStringB dateString
 */
export declare function dateStringDifference(dateStringA: string, dateStringB: string): number;
/** Give the last Date String of current Month */
export declare function lastDateStringOfMonth(): string;
export declare function firstDateStringOfMonth(): string;
export declare function timeLeft24h(s?: boolean): number;
//# sourceMappingURL=utc.d.ts.map