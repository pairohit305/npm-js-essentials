export declare function utcDate(): string;
/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
export declare function dateString(dayModifier?: number): string;
export declare function toLateDate(dateString: string): string;
export declare function toEarlyDate(dateString: string): string;
export declare function toDateInt(dateString: string): number;
export declare function toDateInt2(dayModifier?: number): number;
export declare function utcTimestamp(): number;
/**
 * Returns the differences in days between two dateString in days
 * @param dateString1 dateString
 * @param dateString2 dateString
 */
export declare function dateStringDifference(dateString1: string, dateString2: string): number;
//# sourceMappingURL=utc.d.ts.map