"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringDifference = exports.utcTimestamp = exports.toDateInt2 = exports.toDateInt = exports.toEarlyDate = exports.toLateDate = exports.dateString = exports.utcDate = void 0;
const date_fns_1 = require("date-fns");
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
/* 20201010 -> 123123012312012 */
function toDateInt(dateString) {
    return Date.UTC(Number(dateString.slice(0, 4)), Number(dateString.slice(4, 6)) - 1, Number(dateString.slice(-2)));
}
exports.toDateInt = toDateInt;
/* op: 123123012312012 */
function toDateInt2(dayModifier) {
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
exports.toDateInt2 = toDateInt2;
/* op: 1604247241 */
function utcTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
}
exports.utcTimestamp = utcTimestamp;
/**
 * Returns the differences in days between two dateString in days
 * @param dateString1 dateString
 * @param dateString2 dateString
 */
function dateStringDifference(dateString1, dateString2) {
    return Math.abs(date_fns_1.differenceInDays(toDateInt(dateString1), toDateInt(dateString2)));
}
exports.dateStringDifference = dateStringDifference;
//# sourceMappingURL=utc.js.map