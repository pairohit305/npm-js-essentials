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

/**
 * Format: `1970-01-01T00:00:00.000Z`
 */
type ISO = string;

export const DateII = {
  getISO() {
    return new Date().toISOString();
  },

  getTimestamp() {
    return Date.now();
  },

  convertTimestampToISO(timestamp: number) {
    return new Date(timestamp).toISOString();
  },

  formatISO(ISO: ISO, format: string) {
    return fnsFormat(parseISO(ISO), format);
  },

  formatTimestamp(timestamp: number, format: string) {
    return fnsFormat(timestamp, format);
  },

  getISOdifferenceIn(
    leftISO: string,
    rightISO: string,
    options: { differenceIn: "hours" | "days" | "months" }
  ): number {
    if (options.differenceIn === "hours") {
      return differenceInHours(parseISO(leftISO), parseISO(rightISO));
    } else if (options.differenceIn === "days") {
      return differenceInDays(parseISO(leftISO), parseISO(rightISO));
    } else if (options.differenceIn === "months") {
      return differenceInMonths(parseISO(leftISO), parseISO(rightISO));
    } else return 0;
  },

  modifyISO(
    ISO: string,
    modifier: `alter-by-(${number})-${"hours" | "days" | "months"}`
  ) {
    return ISO;
  },
};
