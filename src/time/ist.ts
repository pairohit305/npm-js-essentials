import moment from "moment-timezone";

// ex: 2020:07:10T10:15:00
export function toISTstring() {
  return moment.tz("Asia/Kolkata").format("YYYY:MM:DDTHH:mm:ss");
}
/**
 // prettier-ignore
 * Example:  
 *  default : o/p => 202010**15**  
 *  dayModifier = **10** : o/p => 202010**25**  
 *  dayModifier = **-10** : o/p => 202010**05**  
 */
export function toIST2day(dayModifier?: number) {
  if (dayModifier && dayModifier > 0) {
    return moment.tz("Asia/Kolkata").add(dayModifier, "d").format("YYYYMMDD");
  } else if (dayModifier && dayModifier < 0) {
    return moment
      .tz("Asia/Kolkata")
      .subtract(-dayModifier, "d")
      .format("YYYYMMDD");
  } else {
    return moment.tz("Asia/Kolkata").format("YYYYMMDD");
  }
}
