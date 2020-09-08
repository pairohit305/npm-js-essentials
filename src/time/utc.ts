import { format, addDays, subDays } from "date-fns";
/**
 // prettier-ignore
 * Example:  
 *  default : o/p => 202010**15**  
 *  dayModifier = **10** : o/p => 202010**25**  
 *  dayModifier = **-10** : o/p => 202010**05**  
 */
export function toUTC2day(dayModifier?: number) {
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
export function UTC2daytoUTCString(UTC2day: string) {
  return new Date(
    Date.UTC(
      Number(UTC2day.slice(0, 4)),
      Number(UTC2day.slice(4, 6)) - 1,
      Number(UTC2day.slice(-2)),
      23,
      59,
      59,
      999
    )
  ).toUTCString();
}

export function toUTCNumber(dayModifier?: number) {
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
