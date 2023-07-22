export declare const DateII: {
    now(): number;
    util(date: number, mode: "start-of-minute" | "start-of-hour" | "start-of-day" | "start-of-month" | "end-of-minute" | "end-of-hour" | "end-of-day" | "end-of-month"): number | undefined;
    format(date: number, format: string): string;
    calculate(leftDate: number, rightDate: number, options: {
        differenceIn: "minutes" | "hours" | "days" | "months";
    }): number;
    modify(date: number, modifier: `alter-by-(${number})-${"minutes" | "hours" | "days" | "months"}`): number;
};
