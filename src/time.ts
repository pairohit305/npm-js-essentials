import {
  parseISO,
  format as fnsFormat,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  addHours,
  addDays,
  addMonths,
  subHours,
  subDays,
  subMonths,
} from "date-fns";

export const DateII = {
  now() {
    return Date.now();
  },

  format(timestamp: number, format: string) {
    return fnsFormat(timestamp, format);
  },

  calculateDifferenceIn(
    left: number,
    right: number,
    options: { differenceIn: "hours" | "days" | "months" }
  ): number {
    if (options.differenceIn === "hours") {
      return differenceInHours(left, right);
    } else if (options.differenceIn === "days") {
      return differenceInDays(left, right);
    } else if (options.differenceIn === "months") {
      return differenceInMonths(left, right);
    } else return 0;
  },

  modifyISO(
    timestamp: number,
    modifier: `alter-by-(${number})-${"hours" | "days" | "months"}`
  ) {
    return 0;
  },
};
