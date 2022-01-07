"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dates = void 0;
const date_fns_1 = require("date-fns");
class Dates {
    // => Wed, 02 Dec 2020 05:47:41 GMT
    static UTC(options) {
        let utc = "";
        if ((options === null || options === void 0 ? void 0 : options.alterBy) && typeof options.alterBy === "string") {
            utc =
                options.alterBy === "alpha"
                    ? (() => {
                        const d = new Date();
                        d.setUTCMonth(d.getUTCMonth(), 1);
                        d.setUTCHours(0, 0, 0, 0);
                        return d.toUTCString();
                    })()
                    : (() => {
                        const d = new Date();
                        d.setUTCMonth(d.getUTCMonth() + 1, 0);
                        d.setUTCHours(23, 59, 59, 999);
                        return d.toUTCString();
                    })();
        }
        else if ((options === null || options === void 0 ? void 0 : options.alterBy) && typeof options.alterBy === "number") {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            utc =
                options.alterBy > 0
                    ? (0, date_fns_1.addDays)(d, options.alterBy).toUTCString()
                    : (0, date_fns_1.subDays)(d, -options.alterBy).toUTCString();
        }
        else {
            utc = new Date().toUTCString();
        }
        return utc;
    }
    // => 20210225T125958.000Z
    static ISO(options) {
        let _iso = "";
        if ((options === null || options === void 0 ? void 0 : options.alterBy) && typeof options.alterBy === "string") {
            _iso =
                options.alterBy === "alpha"
                    ? (() => {
                        const d = new Date();
                        d.setUTCMonth(d.getUTCMonth(), 1);
                        d.setUTCHours(0, 0, 0, 0);
                        return d.toISOString();
                    })()
                    : (() => {
                        const d = new Date();
                        d.setUTCMonth(d.getUTCMonth() + 1, 0);
                        d.setUTCHours(23, 59, 59, 999);
                        return d.toISOString();
                    })();
        }
        else if ((options === null || options === void 0 ? void 0 : options.alterBy) && typeof options.alterBy === "number") {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            _iso =
                options.alterBy > 0
                    ? (0, date_fns_1.addDays)(d, options.alterBy).toISOString()
                    : (0, date_fns_1.subDays)(d, -options.alterBy).toISOString();
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
        if ((options === null || options === void 0 ? void 0 : options.representation) === "date")
            return iso.split("T")[0];
        return iso;
    }
    // => 1614326147_000
    static timestamp(options) {
        let timestamp = 0;
        if ((options === null || options === void 0 ? void 0 : options.alterBy) && typeof options.alterBy === "string") {
            timestamp =
                options.alterBy === "alpha"
                    ? (() => {
                        const d = new Date();
                        d.setUTCMonth(d.getUTCMonth(), 1);
                        d.setUTCHours(0, 0, 0, 0);
                        return d.getTime();
                    })()
                    : (() => {
                        const d = new Date();
                        d.setUTCMonth(d.getUTCMonth() + 1, 0);
                        d.setUTCHours(0, 0, 0, 0);
                        return d.getTime();
                    })();
        }
        else if ((options === null || options === void 0 ? void 0 : options.alterBy) && typeof options.alterBy === "number") {
            const d = new Date();
            d.setUTCHours(0, 0, 0, 0);
            timestamp =
                options.alterBy > 0
                    ? (0, date_fns_1.addDays)(d, options.alterBy).getTime()
                    : (0, date_fns_1.subDays)(d, -options.alterBy).getTime();
        }
        else {
            timestamp = Date.now();
        }
        return (options === null || options === void 0 ? void 0 : options.inSecs) ? Math.round(timestamp / 1000) : timestamp;
    }
    // => 11-02-01
    static DWM() {
        const D = (0, date_fns_1.getDate)(new Date());
        const W = (0, date_fns_1.getWeek)(new Date());
        const M = (0, date_fns_1.getMonth)(new Date());
        return `${D}-${W}-${M}`;
    }
    static parseDWM(DWM) {
        const [D, W, M] = DWM.split("-");
        return { D: Number(D) || "", W: Number(W) || "", M: Number(M) || "" };
    }
    // conversion
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
    static dimeToTimestamp(dime, options) {
        const timestamp = Date.UTC(Number(dime.slice(0, 4)), Number(dime.slice(4, 6)) - 1, Number(dime.slice(-2)));
        return (options === null || options === void 0 ? void 0 : options.inSecs) ? Math.round(timestamp / 1000) : timestamp;
    }
    static timeToDime(time) {
        return time.split("T")[0];
    }
    static timeToDate(time) {
        return (0, date_fns_1.parseISO)(time);
    }
    static timeToInputDate(time) {
        return (0, date_fns_1.parseISO)(time).toISOString().slice(0, 10);
    }
    static timeToInputDateTime(time) {
        return (0, date_fns_1.parseISO)(time).toISOString().slice(0, 16);
    }
    static timeToTimestamp(time, options) {
        const timestamp = (0, date_fns_1.parseISO)(time).getTime();
        return (options === null || options === void 0 ? void 0 : options.inSecs) ? Math.round(timestamp / 1000) : timestamp;
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
    static timeAlterBy(time, alterBy) {
        const d = (0, date_fns_1.parseISO)(time);
        let iso = "";
        const _iso = alterBy > 0
            ? (0, date_fns_1.addDays)(d, alterBy).toISOString()
            : (0, date_fns_1.subDays)(d, -alterBy).toISOString();
        for (const char of _iso) {
            if (char === ":" || char === "-")
                continue;
            iso += char;
        }
        return iso;
    }
    static remainingTimeInSecs(time1, time2) {
        time2 = time2 || this.ISO();
        return Math.abs(this.timeToTimestamp(time2, { inSecs: true }) -
            this.timeToTimestamp(time1, { inSecs: true }));
    }
    static differenceInDays(LTimestamp, RTimestamp) {
        return Math.abs((0, date_fns_1.differenceInDays)(LTimestamp, RTimestamp));
    }
    // => 20210225
    static dime(options) {
        return this.ISO({ representation: "date", alterBy: options === null || options === void 0 ? void 0 : options.alterBy });
    }
    /** convert iso / gmt to the local  */
    static beautify(time, format = "ISO", withTime) {
        if (format === "ISO") {
            return (0, date_fns_1.format)((0, date_fns_1.parseISO)(time), withTime ? "do MMM, yyyy - hh:mm a" : "do MMM, yyyy");
        }
        else if (format === "dime") {
            return (0, date_fns_1.format)((0, date_fns_1.parseISO)(time), "do MMM, yyyy");
        }
        else if (format === "UTC") {
            return (0, date_fns_1.format)(new Date(time), withTime ? "do MMM, yyyy - hh:mm a" : "do MMM, yyyy");
        }
        else
            return " - ";
    }
}
exports.Dates = Dates;
//# sourceMappingURL=dates.js.map