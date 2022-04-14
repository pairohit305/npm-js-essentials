"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = exports.TIMELINE_STATUS = exports.Dates = void 0;
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
    static beautify(time, form = "short") {
        return form === "full"
            ? (0, date_fns_1.format)((0, date_fns_1.parseISO)(time), "hh:mm a '.' MMM d, yyyy")
            : (() => {
                const differenceTimeInS = (this.timestamp() - this.timeToTimestamp(time)) / 1000;
                let min, hour;
                if (differenceTimeInS < 0) {
                    return (0, date_fns_1.format)((0, date_fns_1.parseISO)(time), "MMM d, yyyy");
                }
                if ((min = Math.floor(differenceTimeInS / 60)) <= 60) {
                    return min + "m";
                }
                if ((hour = Math.floor(differenceTimeInS / 3600)) <= 24) {
                    return hour + "h";
                }
                if ((0, date_fns_1.getYear)(new Date()) === (0, date_fns_1.getYear)(this.timeToTimestamp(time))) {
                    return (0, date_fns_1.format)((0, date_fns_1.parseISO)(time), "MMM d");
                }
                return (0, date_fns_1.format)((0, date_fns_1.parseISO)(time), "MMM d, yyyy");
            })();
    }
}
exports.Dates = Dates;
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
    constructor(start_time, finish_time, 
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
     */
    SWITCH_SECONDS = 120, replacer = ["Starts in ", "Ends in ", "Ended"]) {
        this.SWITCH_SECONDS = SWITCH_SECONDS;
        this.replacer = replacer;
        this.STATUS = exports.TIMELINE_STATUS.UNKNOWN;
        this.time = 0;
        this.timeString = " - ";
        this.start = (nolog = false) => {
            // fresh start
            this.kill();
            if (this._onStart && !nolog)
                this._onStart();
            // assigning value
            this.STATUS = Timeline.getStatus(this.start_time, this.finish_time);
            this.time =
                this.STATUS === exports.TIMELINE_STATUS.STARTS_SOON
                    ? Dates.timeToTimestamp(this.start_time, { inSecs: true }) -
                        Dates.timestamp({ inSecs: true })
                    : this.STATUS === exports.TIMELINE_STATUS.ENDS_SOON
                        ? Dates.timeToTimestamp(this.finish_time, { inSecs: true }) -
                            Dates.timestamp({ inSecs: true })
                        : 0;
            this.interval =
                this.STATUS === exports.TIMELINE_STATUS.STARTS_SOON ||
                    this.STATUS === exports.TIMELINE_STATUS.ENDS_SOON
                    ? this.time <= this.SWITCH_SECONDS
                        ? 1000
                        : 60000
                    : undefined;
            this.update(this.STATUS);
            return this.kill;
        };
        this.update = (status) => __awaiter(this, void 0, void 0, function* () {
            // NOT_STARTED
            if (status === exports.TIMELINE_STATUS.NOT_STARTED) {
                // remaining days
                const days = Dates.differenceInDays(Dates.timestamp(), Dates.timeToTimestamp(this.start_time));
                const hours = Math.floor(((Dates.timeToTimestamp(this.start_time, { inSecs: true }) -
                    Dates.timestamp({ inSecs: true })) /
                    (60 * 60)) %
                    24);
                const time = this.replacer[0].trim() + " " + days + "d" + " " + hours + "h";
                if (this._onUpdate)
                    this._onUpdate({ status, time });
                return this.finish();
                // STARTED_IN_BETWEEN
            }
            else if (status === exports.TIMELINE_STATUS.STARTED_IN_BETWEEN) {
                // remaining days
                const days = Dates.differenceInDays(Dates.timestamp(), Dates.timeToTimestamp(this.finish_time));
                const hours = Math.floor(((Dates.timeToTimestamp(this.finish_time, { inSecs: true }) -
                    Dates.timestamp({ inSecs: true })) /
                    (60 * 60)) %
                    24);
                const time = this.replacer[1].trim() + " " + days + "d" + " " + hours + "h";
                if (this._onUpdate)
                    this._onUpdate({ status, time });
                return this.finish();
                // ENDED
            }
            else if (status === exports.TIMELINE_STATUS.ENDED) {
                const days = Dates.differenceInDays(Dates.timestamp(), Dates.timeToTimestamp(this.finish_time));
                const time = this.replacer[2].trim() + " " + (days ? days + "d" : "");
                if (this._onUpdate)
                    this._onUpdate({ status, time });
                return this.finish();
                // ENDS_SOON
            }
            else if (status === exports.TIMELINE_STATUS.ENDS_SOON) {
                // time string logic
                // in some case hour, mins are not required
                let hours = this.time <= this.SWITCH_SECONDS
                    ? null
                    : Math.floor((this.time / (60 * 60)) % 24);
                let minutes = Math.floor((this.time / 60) % 60);
                let seconds = this.time > this.SWITCH_SECONDS ? null : Math.floor(this.time % 60);
                // converting to double digits
                hours = this.toDoubleDigit(hours, "h");
                minutes = this.toDoubleDigit(minutes, "m");
                seconds = this.toDoubleDigit(seconds, "s");
                this.timeString =
                    this.replacer[1].trim() + " " + hours + minutes + seconds;
                if (this._onUpdate)
                    this._onUpdate({ status: this.STATUS, time: this.timeString });
                // time logic
                switch (true) {
                    case this.time <= 1:
                        yield this.sleep(1000);
                        this.update(exports.TIMELINE_STATUS.ENDED);
                        break;
                    case this.time > this.SWITCH_SECONDS:
                        this.time -= 60;
                        yield this.sleep(60000);
                        this.update(exports.TIMELINE_STATUS.ENDS_SOON);
                        break;
                    case this.time <= this.SWITCH_SECONDS && this.interval === 1000:
                        this.time -= 1;
                        yield this.sleep(1000);
                        this.update(exports.TIMELINE_STATUS.ENDS_SOON);
                        break;
                    case this.time <= this.SWITCH_SECONDS && this.interval === 60000:
                        // change the interval time from 60s to 1s
                        this.interval = 1000;
                        this.time -= 1;
                        this.update(exports.TIMELINE_STATUS.ENDS_SOON);
                        break;
                }
                // STARTS_SOON
            }
            else if (status === exports.TIMELINE_STATUS.STARTS_SOON) {
                // time string logic
                // in some case hour, mins are not required
                let hours = this.time <= this.SWITCH_SECONDS
                    ? null
                    : Math.floor((this.time / (60 * 60)) % 24);
                let minutes = Math.floor((this.time / 60) % 60);
                let seconds = this.time > this.SWITCH_SECONDS ? null : Math.floor(this.time % 60);
                // converting to double digits
                hours = this.toDoubleDigit(hours, "h");
                minutes = this.toDoubleDigit(minutes, "m");
                seconds = this.toDoubleDigit(seconds, "s");
                this.timeString =
                    this.replacer[0].trim() + " " + hours + minutes + seconds;
                if (this._onUpdate)
                    this._onUpdate({ status: this.STATUS, time: this.timeString });
                // time logic
                switch (true) {
                    case this.time <= 1:
                        yield this.sleep(1000);
                        this.update(exports.TIMELINE_STATUS.STARTED_IN_BETWEEN);
                        break;
                    case this.time > this.SWITCH_SECONDS:
                        this.time -= 60;
                        yield this.sleep(60000);
                        this.update(exports.TIMELINE_STATUS.STARTS_SOON);
                        break;
                    case this.time <= this.SWITCH_SECONDS && this.interval === 1000:
                        this.time -= 1;
                        yield this.sleep(1000);
                        this.update(exports.TIMELINE_STATUS.STARTS_SOON);
                        break;
                    case this.time <= this.SWITCH_SECONDS && this.interval === 60000:
                        // change the interval time from 60s to 1s
                        this.interval = 1000;
                        this.time -= 1;
                        this.update(exports.TIMELINE_STATUS.STARTS_SOON);
                        break;
                }
            }
        });
        this.finish = () => {
            this.kill();
            // user's onfinish method called
            if (this._onFinish)
                this._onFinish();
        };
        /** Call this function to stop the timeline
         *  and clear all timers
         */
        this.kill = () => {
            clearTimeout(this.intervaler);
        };
        this.start_time = start_time;
        this.finish_time = finish_time;
        this.onStart = this.onStart.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.sleep = this.sleep.bind(this);
        this.restart = this.restart.bind(this);
    }
    // sleep
    sleep(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.intervaler = setTimeout(() => {
                    resolve(true);
                }, ms);
            });
        });
    }
    restart(start_time, finish_time) {
        this.start_time = start_time;
        this.finish_time = finish_time;
        this.STATUS = exports.TIMELINE_STATUS.UNKNOWN;
        this.time = 0;
        this.interval = undefined;
        this.start(true);
    }
    onStart(callback) {
        this._onStart = callback;
        return {
            onUpdate: this.onUpdate,
            start: () => this.start(),
        };
    }
    onUpdate(callback) {
        this._onUpdate = callback;
        return {
            onFinish: this.onFinish,
            start: () => this.start(),
        };
    }
    onFinish(callback) {
        this._onFinish = callback;
        return {
            start: this.start,
        };
    }
    toDoubleDigit(digit, append) {
        if (digit === null)
            return "";
        return ((digit.toString().length === 1 ? "0" + digit : digit.toString()) +
            append +
            " ");
    }
    // usefull methods
    static getStatus(start_time, finish_time) {
        if (start_time > finish_time) {
            throw new RangeError("start_time > finish_time is not allowed!");
        }
        const _24h = 86400000;
        const now_time = Dates.ISO();
        switch (true) {
            case now_time < start_time:
                if (Dates.timeToTimestamp(start_time) - Dates.timestamp() <= _24h) {
                    return exports.TIMELINE_STATUS.STARTS_SOON;
                }
                else {
                    return exports.TIMELINE_STATUS.NOT_STARTED;
                }
            case now_time > finish_time:
                return exports.TIMELINE_STATUS.ENDED;
            case now_time >= start_time && now_time <= finish_time:
                if (Dates.timeToTimestamp(finish_time) - Dates.timestamp() <= _24h) {
                    return exports.TIMELINE_STATUS.ENDS_SOON;
                }
                else {
                    return exports.TIMELINE_STATUS.STARTED_IN_BETWEEN;
                }
            default:
                return exports.TIMELINE_STATUS.UNKNOWN;
        }
    }
}
exports.Timeline = Timeline;
//# sourceMappingURL=index.js.map