/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
export declare function toUTC2day(dayModifier?: number): string;
export declare function UTC2daytoUTCString(UTC2day: string): string;
export declare function UTC2daytoNumber(UTC2day: string): number;
export declare function toUTCNumber(dayModifier?: number): number;
/**
 * Returns the differences in days between two UTC2day
 * @param UTC2day1 UTC2day string
 * @param UTC2day2 UTC2day string
 */
export declare function UTCDiffdays(UTC2day1: string, UTC2day2: string): number;
//# sourceMappingURL=utc.d.ts.map