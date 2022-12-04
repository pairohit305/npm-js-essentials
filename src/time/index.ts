import { parseISO } from "date-fns";

type ISO = string;
export const DateII = {
  getISO(options?: {
    reference?: ISO;
    modifier?: `alter-by-(${number})-days` | `start-of-month` | `end-of-month`;
    representation?: `time` | `dime` | `timestamp`;
  }) {
    let ISO = options?.reference ?? new Date().toISOString();

    if (options?.modifier === "start-of-month") {
    } else if (options?.modifier === "end-of-month") {
    } else if (options?.modifier?.match(/alter-by-\(((-|\+|)\d+)\)-days/)) {
    }

    if (options?.representation === "dime") {
      return ISO.split("T")[0];
    }

    if (options?.representation === "timestamp") {
      return parseISO(ISO).getTime().toString();
    }

    return ISO;
  },

  convertTimestampToISO(timestamp: number) {
    return new Date(timestamp).toISOString();
  },

  getInputDate(ISO: string) {
    return parseISO(ISO).toISOString().slice(0, 10);
  },

  getInputDateTime(ISO: string) {
    return parseISO(ISO).toISOString().slice(0, 16);
  },
};
