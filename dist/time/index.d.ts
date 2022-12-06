type ISO = string;
export declare const DateII: {
    getISO(options?: {
        reference?: ISO;
        modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
        representation?: `time` | `dime` | `timestamp`;
    }): string;
    convertTimestampToISO(timestamp: number): string;
    getInputDate(ISO: string): string;
    getInputDateTime(ISO: string): string;
};
export {};
//# sourceMappingURL=index.d.ts.map