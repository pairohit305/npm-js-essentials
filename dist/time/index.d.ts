export declare const DateII: {
    getISO(options?: {
        reference?: string | undefined;
        modifier?: `alter-by-(${number})-days` | "start-of-month" | "end-of-month" | undefined;
        representation?: "time" | "dime" | "timestamp" | undefined;
    } | undefined): string;
    convertTimestampToISO(timestamp: number): string;
    formatISO(ISO: string, format: string): string;
    getISOdifferenceIn(leftISO: string, rightISO: string, options: {
        differenceIn: "hours" | "days" | "months";
    }): number;
};
