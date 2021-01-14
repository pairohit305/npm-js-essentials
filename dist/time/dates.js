"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeLeft24h = exports.firstDateStringOfMonth = exports.lastDateStringOfMonth = exports.dateStringDifference = exports.toTimestamp = exports.timestamp = exports.toEarlyDate = exports.toLateDate = exports.toDateString = exports.dateString = exports.utcDate = void 0;
const date_fns_1 = require("date-fns");
/** op: Wed, 02 Dec 2020 05:47:41 GMT */
function utcDate() {
    return new Date().toUTCString();
}
exports.utcDate = utcDate;
/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
function dateString(dayModifier) {
    const utcnumber = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
    if (dayModifier && dayModifier > 0) {
        return date_fns_1.format(date_fns_1.addDays(utcnumber, dayModifier), "yyyyMMdd");
    }
    else if (dayModifier && dayModifier < 0) {
        return date_fns_1.format(date_fns_1.subDays(utcnumber, -dayModifier), "yyyyMMdd");
    }
    else {
        return date_fns_1.format(utcnumber, "yyyyMMdd");
    }
}
exports.dateString = dateString;
/** 1604247241_000 -> 20201202*/
function toDateString(timestamp) {
    return date_fns_1.format(timestamp, "yyyyMMdd");
}
exports.toDateString = toDateString;
/* 20201010 -> "Tue, 10 Oct 2020 23:59:59 GMT" */
function toLateDate(dateString) {
    return new Date(Date.UTC(Number(dateString.slice(0, 4)), Number(dateString.slice(4, 6)) - 1, Number(dateString.slice(-2)), 23, 59, 59, 999)).toUTCString();
}
exports.toLateDate = toLateDate;
/* 20201010 -> "Tue, 10 Oct 2020 00:00:00 GMT" */
function toEarlyDate(dateString) {
    return new Date(Date.UTC(Number(dateString.slice(0, 4)), Number(dateString.slice(4, 6)) - 1, Number(dateString.slice(-2)), 0, 0, 0, 0)).toUTCString();
}
exports.toEarlyDate = toEarlyDate;
/* op: 1604247241_000
            or
  20201010 -> 1606867200_000
*/
function timestamp(dateString, 
/** output in seconds  */
s) {
    if (dateString) {
        const num = Date.UTC(Number(dateString.slice(0, 4)), Number(dateString.slice(4, 6)) - 1, Number(dateString.slice(-2)));
        return s ? num / 1000 : num;
    }
    const num = new Date().getTime();
    return Math.floor(num / (s ? 1000 : 1));
}
exports.timestamp = timestamp;
/** "Tue, 10 Oct 2020 00:00:00 GMT" -> 1604247241_000 or 1604247241 */
function toTimestamp(utcDate, 
/** output in seconds */
s) {
    const num = Date.parse(utcDate);
    return Math.floor(num / (s ? 1000 : 1));
}
exports.toTimestamp = toTimestamp;
// UTILS
/**
 * Returns the differences in days between two dateString in days
 * @param dateStringA dateString
 * @param dateStringB dateString
 */
function dateStringDifference(dateStringA, dateStringB) {
    return Math.abs(date_fns_1.differenceInDays(timestamp(dateStringA), timestamp(dateStringB)));
}
exports.dateStringDifference = dateStringDifference;
/** Give the last Date String of current Month */
function lastDateStringOfMonth() {
    return date_fns_1.format(date_fns_1.lastDayOfMonth(timestamp()), "yyyyMMdd");
}
exports.lastDateStringOfMonth = lastDateStringOfMonth;
function firstDateStringOfMonth() {
    return dateString().slice(0, 6) + "01";
}
exports.firstDateStringOfMonth = firstDateStringOfMonth;
function timeLeft24h(s) {
    const timeleft = timestamp(dateString(1)) - timestamp();
    return Math.round(s ? timeleft / 1000 : timeleft);
}
exports.timeLeft24h = timeLeft24h;
//# sourceMappingURL=dates.js.map