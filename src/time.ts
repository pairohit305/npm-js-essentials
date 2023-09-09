import {
  format as fnsFormat,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  subMinutes,
  subHours,
  subDays,
  subMonths,
  startOfMinute,
  startOfHour,
  startOfDay,
  startOfMonth,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfMonth,
} from "date-fns";

export const DateII = {
  now() {
    return Date.now();
  },

  util(
    date: number,
    mode:
      | "start-of-minute"
      | "start-of-hour"
      | "start-of-day"
      | "start-of-month"
      | "end-of-minute"
      | "end-of-hour"
      | "end-of-day"
      | "end-of-month"
  ) {
    if (mode === "start-of-minute") {
      return startOfMinute(date).getTime();
    }

    if (mode === "start-of-hour") {
      return startOfHour(date).getTime();
    }

    if (mode === "start-of-day") {
      return startOfDay(date).getTime();
    }

    if (mode === "start-of-month") {
      return startOfMonth(date).getTime();
    }

    if (mode === "end-of-minute") {
      return endOfMinute(date).getTime();
    }

    if (mode === "end-of-hour") {
      return endOfHour(date).getTime();
    }

    if (mode === "end-of-day") {
      return endOfDay(date).getTime();
    }

    if (mode === "end-of-month") {
      return endOfMonth(date).getTime();
    }

    return 0;
  },

  format(date: number, format: string) {
    return fnsFormat(date, format);
  },

  calculate(
    leftDate: number,
    rightDate: number,
    options: { differenceIn: "minutes" | "hours" | "days" | "months" }
  ): number {
    if (options.differenceIn === "minutes") {
      return differenceInMinutes(leftDate, rightDate);
    }

    if (options.differenceIn === "hours") {
      return differenceInHours(leftDate, rightDate);
    }

    if (options.differenceIn === "days") {
      return differenceInDays(leftDate, rightDate);
    }

    if (options.differenceIn === "months") {
      return differenceInMonths(leftDate, rightDate);
    }

    return 0;
  },

  modify(
    date: number,
    modifier: `alter-by-(${number})-${"minutes" | "hours" | "days" | "months"}`
  ) {
    if (modifier.match(/^alter-by-\(-?\d+\)-minutes$/)) {
      const minutes = +modifier.match(/^alter-by-\((-?\d+)\)-minutes$/)![1];
      if (minutes === 0) return date;

      return minutes > 0
        ? addMinutes(date, minutes).getTime()
        : subMinutes(date, Math.abs(minutes)).getTime();
    }

    if (modifier.match(/^alter-by-\(-?\d+\)-hours$/)) {
      const hours = +modifier.match(/^alter-by-\((-?\d+)\)-hours$/)![1];
      if (hours === 0) return date;

      return hours > 0
        ? addHours(date, hours).getTime()
        : subHours(date, Math.abs(hours)).getTime();
    }

    if (modifier.match(/^alter-by-\(-?\d+\)-days$/)) {
      const days = +modifier.match(/^alter-by-\((-?\d+)\)-days$/)![1];
      if (days === 0) return date;

      return days > 0
        ? addDays(date, days).getTime()
        : subDays(date, Math.abs(days)).getTime();
    }

    if (modifier.match(/^alter-by-\(-?\d+\)-months$/)) {
      const months = +modifier.match(/^alter-by-\((-?\d+)\)-months$/)![1];
      if (months === 0) return date;

      return months > 0
        ? addMonths(date, months).getTime()
        : subMonths(date, Math.abs(months)).getTime();
    }

    return 0;
  },
};
