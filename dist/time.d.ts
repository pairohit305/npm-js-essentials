export declare const DateII: {
    getISO(): string;
    getTimestamp(): number;
    convertTimestampToISO(timestamp: number): string;
    formatISO(ISO: string, format: string): string;
    formatTimestamp(timestamp: number, format: string): string;
    getISOdifferenceIn(leftISO: string, rightISO: string, options: {
        differenceIn: "hours" | "days" | "months";
    }): number;
    modifyISO(ISO: string, modifier: `alter-by-(${number})-${"hours" | "days" | "months"}`): string;
};
