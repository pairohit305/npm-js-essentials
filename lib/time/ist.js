"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toIST2HourLeft = exports.toIST2Hour = exports.toIST2day = exports.toISTstring = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// ex: 2020:07:10T10:15:00
function toISTstring() {
    return moment_timezone_1.default.tz("Asia/Kolkata").format("YYYY:MM:DDTHH:mm:ss");
}
exports.toISTstring = toISTstring;
/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
function toIST2day(dayModifier) {
    if (dayModifier && dayModifier > 0) {
        return moment_timezone_1.default.tz("Asia/Kolkata").add(dayModifier, "d").format("YYYYMMDD");
    }
    else if (dayModifier && dayModifier < 0) {
        return moment_timezone_1.default
            .tz("Asia/Kolkata")
            .subtract(-dayModifier, "d")
            .format("YYYYMMDD");
    }
    else {
        return moment_timezone_1.default.tz("Asia/Kolkata").format("YYYYMMDD");
    }
}
exports.toIST2day = toIST2day;
function toIST2Hour() {
    return moment_timezone_1.default.tz("Asia/Kolkata").format("HHmmss");
}
exports.toIST2Hour = toIST2Hour;
function toIST2HourLeft() {
    return (240000 - parseInt(toIST2Hour())).toString();
}
exports.toIST2HourLeft = toIST2HourLeft;
//# sourceMappingURL=ist.js.map