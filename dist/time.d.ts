export declare const DateII: {
    now(): number;
    format(timestamp: number, format: string): string;
    calculateDifferenceIn(left: number, right: number, options: {
        differenceIn: "hours" | "days" | "months";
    }): number;
    modifyISO(timestamp: number, modifier: `alter-by-(${number})-${"hours" | "days" | "months"}`): number;
};
