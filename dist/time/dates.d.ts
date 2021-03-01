export declare class Dates {
    static UTC(options?: {
        alterBy?: number | "final" | "alpha";
    }): string;
    static ISO(options?: {
        representation?: "complete" | "date";
        alterBy?: number | "final" | "alpha";
    }): string;
    static timestamp(options?: {
        inSecs?: boolean;
        alterBy?: number | "final" | "alpha";
    }): number;
    static dateToTime(date: Date): string;
    static dimeToTimestamp(dime: string, options?: {
        inSecs?: boolean;
    }): number;
    static timeToDime(time: string): string;
    static timeToDate(time: string): Date;
    static timeToInputDate(time: string): string;
    static timeToInputDateTime(time: string): string;
    static timeToTimestamp(time: string, options?: {
        inSecs?: boolean;
    }): number;
    static timealterBy(time: string, alterBy: number): string;
    static differenceInDays(LTimestamp: number, RTimestamp: number): number;
    static dime(options?: {
        alterBy?: number | "final" | "alpha";
    }): string;
    /** convert iso / gmt to the local  */
    static beautify(time: string, format?: "ISO" | "UTC"): string | undefined;
}
//# sourceMappingURL=dates.d.ts.map