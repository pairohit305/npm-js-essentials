"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = exports.TIMELINE_STATUS = exports.DateII = void 0;
const date_fns_1 = require("date-fns");
class DateII {
    static ISO(options) {
        var _a, _b;
        let _iso = "";
        if ((options === null || options === void 0 ? void 0 : options.modifier) === "start-of-month") {
            const date = (options === null || options === void 0 ? void 0 : options.time)
                ? this.timeToDate(options.time)
                : this.timeToDate(this.timestampToTime(Date.now()));
            date.setUTCMonth(date.getUTCMonth(), 1);
            date.setUTCHours(0, 0, 0, 0);
            _iso = date.toISOString();
        }
        else if ((options === null || options === void 0 ? void 0 : options.modifier) === "end-of-month") {
            const date = (options === null || options === void 0 ? void 0 : options.time)
                ? this.timeToDate(options.time)
                : this.timeToDate(this.timestampToTime(Date.now()));
            date.setUTCMonth(date.getUTCMonth() + 1, 0);
            date.setUTCHours(23, 59, 59, 999);
            return date.toISOString();
        }
        else if ((_a = options === null || options === void 0 ? void 0 : options.modifier) === null || _a === void 0 ? void 0 : _a.match(/alter-by-\(((-|\+|)\d+)\)-days/)) {
            const date = (options === null || options === void 0 ? void 0 : options.time)
                ? this.timeToDate(options.time)
                : this.timeToDate(this.timestampToTime(Date.now()));
            date.setUTCHours(0, 0, 0, 0);
            const alterBy = parseInt((_b = options.modifier.match(/((-|\+|)\d+)/)) === null || _b === void 0 ? void 0 : _b[0]);
            _iso =
                alterBy > 0
                    ? (0, date_fns_1.addDays)(date, alterBy).toISOString()
                    : (0, date_fns_1.subDays)(date, -alterBy).toISOString();
        }
        else {
            _iso = new Date().toISOString();
        }
        let iso = "";
        for (const char of _iso) {
            if (char === ":" || char === "-")
                continue;
            iso += char;
        }
        if ((options === null || options === void 0 ? void 0 : options.representation) === "dime") {
            return this.timeToDime(iso);
        }
        return iso;
    }
    static timestamp(options) {
        var _a, _b;
        let timestamp = 0;
        if ((options === null || options === void 0 ? void 0 : options.modifier) === "start-of-month") {
            const d = new Date();
            d.setUTCMonth(d.getUTCMonth(), 1);
            d.setUTCHours(0, 0, 0, 0);
            timestamp = d.getTime();
        }
        else if ((options === null || options === void 0 ? void 0 : options.modifier) === "end-of-month") {
            const d = new Date();
            d.setUTCMonth(d.getUTCMonth() + 1, 0);
            d.setUTCHours(23, 59, 59, 999);
            return d.getTime();
        }
        else if ((_a = options === null || options === void 0 ? void 0 : options.modifier) === null || _a === void 0 ? void 0 : _a.match(/alter-by-\(((-|\+|)\d+)\)-days/)) {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            const alterBy = parseInt((_b = options.modifier.match(/((-|\+|)\d+)/)) === null || _b === void 0 ? void 0 : _b[0]);
            timestamp =
                alterBy > 0
                    ? (0, date_fns_1.addDays)(d, alterBy).getTime()
                    : (0, date_fns_1.subDays)(d, -alterBy).getTime();
        }
        else {
            timestamp = Date.now();
        }
        return timestamp;
    }
    static DWM() {
        const D = (0, date_fns_1.getDate)(new Date());
        const W = (0, date_fns_1.getWeek)(new Date());
        const M = (0, date_fns_1.getMonth)(new Date());
        return `${D}-${W}-${M}`;
    }
    static parseDWM(DWM) {
        const [D, W, M] = DWM.split("-");
        return { D: Number(D), W: Number(W), M: Number(M) };
    }
    static dateToTime(date) {
        const _iso = date.toISOString();
        let iso = "";
        for (const char of _iso) {
            if (char === ":" || char === "-")
                continue;
            iso += char;
        }
        return iso;
    }
    static dimeToTimestamp(dime) {
        const timestamp = Date.UTC(Number(dime.slice(0, 4)), Number(dime.slice(4, 6)) - 1, Number(dime.slice(-2)));
        return timestamp;
    }
    static timeToDime(time) {
        return time.split("T")[0];
    }
    static timeToDate(time) {
        return (0, date_fns_1.parseISO)(time);
    }
    static timeToInputDate(time) {
        return this.timeToDate(time).toISOString().slice(0, 10);
    }
    static timeToInputDateTime(time) {
        return this.timeToDate(time).toISOString().slice(0, 16);
    }
    static timeToTimestamp(time) {
        const timestamp = this.timeToDate(time).getTime();
        return timestamp;
    }
    static timestampToTime(timestamp) {
        const date = new Date(timestamp);
        const _iso = date.toISOString();
        let iso = "";
        for (const char of _iso) {
            if (char === ":" || char === "-")
                continue;
            iso += char;
        }
        return iso;
    }
}
exports.DateII = DateII;
// enum
exports.TIMELINE_STATUS = {
    NOT_STARTED: 0,
    STARTS_SOON: 1,
    STARTED_IN_BETWEEN: 2,
    ENDS_SOON: 3,
    ENDED: 4,
    UNKNOWN: 5,
};
/**
 *
 * Important:
 * All timeline is based on GMT
 *
 * This Timeline class is only dynamic when
 * less 24 hours remaining, for rest case static
 * time values is shown.
 *
 * Eg: if 5 days is the timeline the output will
 *     be "Ends in 5d"
 * BUT if 24h is only remaining then output will
 *     be like "7h 23m" ... after 1 min "7h 22m"
 *     and so on ...
 */
class Timeline {
}
exports.Timeline = Timeline;
//# sourceMappingURL=index.js.map