import { format, addDays, subDays, differenceInDays, lastDayOfMonth } from "date-fns";

/** op: Wed, 02 Dec 2020 05:47:41 GMT */
export function utcDate() {
  return new Date().toUTCString();
}
/**
 // prettier-ignore
 * Example:  
 *  default : o/p => 202010**15**  
 *  dayModifier = **10** : o/p => 202010**25**  
 *  dayModifier = **-10** : o/p => 202010**05**  
 */
export function dateString(dayModifier?: number) {
  const utcnumber = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  );

  if (dayModifier && dayModifier > 0) {
    return format(addDays(utcnumber, dayModifier), "yyyyMMdd");
  } else if (dayModifier && dayModifier < 0) {
    return format(subDays(utcnumber, -dayModifier), "yyyyMMdd");
  } else {
    return format(utcnumber, "yyyyMMdd");
  }
}

/** 1604247241_000 -> 20201202*/
export function toDateString(timestamp: number) {
  return format(timestamp, "yyyyMMdd");
}
/* 20201010 -> "Tue, 10 Oct 2020 23:59:59 GMT" */
export function toLateDate(dateString: string) {
  return new Date(
    Date.UTC(
      Number(dateString.slice(0, 4)),
      Number(dateString.slice(4, 6)) - 1,
      Number(dateString.slice(-2)),
      23,
      59,
      59,
      999
    )
  ).toUTCString();
}

/* 20201010 -> "Tue, 10 Oct 2020 00:00:00 GMT" */
export function toEarlyDate(dateString: string) {
  return new Date(
    Date.UTC(
      Number(dateString.slice(0, 4)),
      Number(dateString.slice(4, 6)) - 1,
      Number(dateString.slice(-2)),
      0,
      0,
      0,
      0
    )
  ).toUTCString();
}

/* op: 1604247241_000 
            or
  20201010 -> 1606867200_000
*/
export function timestamp(
  dateString?: string,
  /** output in seconds  */
  s?: boolean
) {
  if (dateString) {
    const num = Date.UTC(
      Number(dateString.slice(0, 4)),
      Number(dateString.slice(4, 6)) - 1,
      Number(dateString.slice(-2))
    );
    return s ? num / 1000 : num;
  }
  const num = new Date().getTime();
  return Math.floor(num / (s ? 1000 : 1));
}

// UTILS

/**
 * Returns the differences in days between two dateString in days
 * @param dateStringA dateString
 * @param dateStringB dateString
 */
export function dateStringDifference(dateStringA: string, dateStringB: string) {
  return Math.abs(differenceInDays(timestamp(dateStringA), timestamp(dateStringB)));
}

/** Give the last Date String of current Month */
export function lastDateStringOfMonth() {
  return format(lastDayOfMonth(timestamp()), "yyyyMMdd");
}

export function firstDateStringOfMonth() {
  return dateString().slice(0, 6) + "01";
}

export function timeLeft24h(s?: boolean) {
  const timeleft = timestamp(dateString(1)) - timestamp();
  return Math.round(s ? timeleft / 1000 : timeleft);
}
