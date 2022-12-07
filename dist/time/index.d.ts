type ISO = string;
export declare const DateII: {
    getISO(options?: {
        reference?: ISO;
        modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
        representation?: `time` | `dime` | `timestamp`;
    }): string;
    convertTimestampToISO(timestamp: number): string;
    formatISO(ISO: string, format: string): string;
};
export {};
//# sourceMappingURL=index.d.ts.map