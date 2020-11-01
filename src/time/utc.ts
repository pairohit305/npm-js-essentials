import { format, addDays, subDays, differenceInDays } from "date-fns";

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

/* 20201010 -> 123123012312012 */
export function toDateInt(dateString: string) {
  return Date.UTC(
    Number(dateString.slice(0, 4)),
    Number(dateString.slice(4, 6)) - 1,
    Number(dateString.slice(-2))
  );
}

/* op: 123123012312012 */
export function toDateInt2(dayModifier?: number) {
  const utcnumber = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  );

  if (dayModifier && dayModifier > 0) {
    return addDays(utcnumber, dayModifier).getTime();
  } else if (dayModifier && dayModifier < 0) {
    return subDays(utcnumber, -dayModifier).getTime();
  } else {
    return utcnumber;
  }
}

/* op: 1604247241 */
export function toDateInt3() {
  return Math.floor(new Date().getTime() / 1000);
}
/**
 * Returns the differences in days between two dateString in days
 * @param dateString1 dateString
 * @param dateString2 dateString
 */
export function dateStringDifference(dateString1: string, dateString2: string) {
  return Math.abs(differenceInDays(toDateInt(dateString1), toDateInt(dateString2)));
}
