import moment from "moment-timezone";

/**
 // prettier-ignore
 * Example:  
 *  default : o/p => 202010**15**  
 *  dayModifier = **10** : o/p => 202010**25**  
 *  dayModifier = **-10** : o/p => 202010**05**  
 */
export function toUTC2day(dayModifier?: number) {
  if (dayModifier && dayModifier > 0) {
    return moment.utc().add(dayModifier, "d").format("YYYYMMDD");
  } else if (dayModifier && dayModifier < 0) {
    return moment.utc().subtract(-dayModifier, "d").format("YYYYMMDD");
  } else {
    return moment.utc().format("YYYYMMDD");
  }
}

/* 20201010 -> "Tue, 10 Nov 2020 00:00:00 GMT" */
export function UTC2daytoUTCString(UTC2day: string) {
  return new Date(
    Date.UTC(
      Number(UTC2day.slice(0, 4)),
      Number(UTC2day.slice(4, 6)),
      Number(UTC2day.slice(-2))
    )
  ).toUTCString();
}

export function toUTC2Hour() {
  return moment.utc().format("HHmmss");
}

export function toUTC2HourLeft() {
  return (240000 - parseInt(toUTC2Hour())).toString();
}
