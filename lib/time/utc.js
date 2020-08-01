"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUTC2HourLeft = exports.toUTC2Hour = exports.toUTC2day = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
/**
 // prettier-ignore
 * Example:
 *  default : o/p => 202010**15**
 *  dayModifier = **10** : o/p => 202010**25**
 *  dayModifier = **-10** : o/p => 202010**05**
 */
function toUTC2day(dayModifier) {
    if (dayModifier && dayModifier > 0) {
        return moment_timezone_1.default.utc().add(dayModifier, "d").format("YYYYMMDD");
    }
    else if (dayModifier && dayModifier < 0) {
        return moment_timezone_1.default.utc().subtract(-dayModifier, "d").format("YYYYMMDD");
    }
    else {
        return moment_timezone_1.default.utc().format("YYYYMMDD");
    }
}
exports.toUTC2day = toUTC2day;
function toUTC2Hour() {
    return moment_timezone_1.default.utc().format("HHmmss");
}
exports.toUTC2Hour = toUTC2Hour;
function toUTC2HourLeft() {
    return (240000 - parseInt(toUTC2Hour())).toString();
}
exports.toUTC2HourLeft = toUTC2HourLeft;
//# sourceMappingURL=utc.js.map