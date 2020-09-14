"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTCDiffdays = exports.toUTCNumber = exports.UTC2daytoNumber = exports.UTC2daytoUTCString = exports.toUTC2day = void 0;
const date_fns_1 = require("date-fns");
/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
function toUTC2day(dayModifier) {
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
exports.toUTC2day = toUTC2day;
/* 20201010 -> "Tue, 10 Oct 2020 23:59:59 GMT" */
function UTC2daytoUTCString(UTC2day) {
    return new Date(Date.UTC(Number(UTC2day.slice(0, 4)), Number(UTC2day.slice(4, 6)) - 1, Number(UTC2day.slice(-2)), 23, 59, 59, 999)).toUTCString();
}
exports.UTC2daytoUTCString = UTC2daytoUTCString;
/* 20201010 -> 123123012312012 */
function UTC2daytoNumber(UTC2day) {
    return Date.UTC(Number(UTC2day.slice(0, 4)), Number(UTC2day.slice(4, 6)) - 1, Number(UTC2day.slice(-2)));
}
exports.UTC2daytoNumber = UTC2daytoNumber;
function toUTCNumber(dayModifier) {
    const utcnumber = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
    if (dayModifier && dayModifier > 0) {
        return date_fns_1.addDays(utcnumber, dayModifier).getTime();
    }
    else if (dayModifier && dayModifier < 0) {
        return date_fns_1.subDays(utcnumber, -dayModifier).getTime();
    }
    else {
        return utcnumber;
    }
}
exports.toUTCNumber = toUTCNumber;
/**
 * Returns the differences in days between two UTC2day
 * @param UTC2day1 UTC2day string
 * @param UTC2day2 UTC2day string
 */
function UTCDiffdays(UTC2day1, UTC2day2) {
    return Math.abs(date_fns_1.differenceInDays(UTC2daytoNumber(UTC2day1), UTC2daytoNumber(UTC2day2)));
}
exports.UTCDiffdays = UTCDiffdays;
//# sourceMappingURL=utc.js.map