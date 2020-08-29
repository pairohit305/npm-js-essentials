import { format, addDays, subDays } from "date-fns";
/**
 // prettier-ignore
 * Example:  
 *  default : o/p => 202010**15**  
 *  dayModifier = **10** : o/p => 202010**25**  
 *  dayModifier = **-10** : o/p => 202010**05**  
 */
export function toUTC2day(dayModifier?: number) {
  if (dayModifier && dayModifier > 0) {
    return format(addDays(new Date(new Date().toUTCString()), dayModifier), "yyyyMMdd");
  } else if (dayModifier && dayModifier < 0) {
    return format(subDays(new Date(new Date().toUTCString()), -dayModifier), "yyyyMMdd");
  } else {
    return format(new Date(new Date().toUTCString()), "yyyyMMdd");
  }
}

/* 20201010 -> "Tue, 10 Nov 2020 00:00:00 GMT" */
export function UTC2daytoUTCString(UTC2day: string) {
  return new Date(
    Date.UTC(Number(UTC2day.slice(0, 4)), Number(UTC2day.slice(4, 6)), Number(UTC2day.slice(-2)))
  ).toUTCString();
}
