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

export function toUTC2Hour() {
  return moment.utc().format("HHmmss");
}

export function toUTC2HourLeft() {
  return (240000 - parseInt(toUTC2Hour())).toString();
}
