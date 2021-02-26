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
    static timeToTimestamp(time: string, options?: {
        inSecs?: boolean;
    }): number;
    static dimeToTimestamp(dime: string, options?: {
        inSecs?: boolean;
    }): number;
    static differenceInDays(LTimestamp: number, RTimestamp: number): number;
    static dime(options?: {
        alterBy?: number | "final" | "alpha";
    }): string;
    /** convert iso / gmt to the local  */
    static beautify(time: string, format?: "ISO" | "UTC"): string | undefined;
}
//# sourceMappingURL=dates.d.ts.map