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
exports.Timeline = exports.TIMELINE_STATUS = exports.lastseen = void 0;
const dates_1 = require("./dates");
/** 1604247241_000 -> yesterday */
function lastseen(timestamp) {
    var differenceTime = dates_1.Dates.timestamp() - timestamp;
    var seconds = differenceTime / 1000;
    var minutes = Math.floor(seconds / 60); // value 60 is seconds
    var hours = Math.floor(seconds / 3600); //value 3600 is 60 minutes * 60 sec
    var days = Math.floor(seconds / 86400); //86400 = 24 * 60 * 60;
    var weeks = Math.floor(seconds / 604800); // 7*24*60*60;
    var months = Math.floor(seconds / 2629440); //((365+365+365+365+366)/5/12)*24*60*60
    var years = Math.floor(seconds / 31553280); //(365+365+365+365+366)/5 * 24 * 60 * 60
    if (seconds <= 60) {
        return "Just Now";
    }
    else if (minutes <= 60) {
        if (minutes == 1) {
            return "one minute ago";
        }
        else {
            return `${minutes} minutes ago`;
        }
    }
    else if (hours <= 24) {
        if (hours == 1) {
            return "an hour ago";
        }
        else {
            return `${hours} hrs ago`;
        }
    }
    else if (days <= 7) {
        if (days == 1) {
            return "yesterday";
        }
        else {
            return `${days} days ago`;
        }
    }
    else if (weeks <= 4.3) {
        //4.3 == 52/12
        if (weeks == 1) {
            return "a week ago";
        }
        else {
            return `${weeks} weeks ago`;
        }
    }
    else if (months <= 12) {
        if (months == 1) {
            return "a month ago";
        }
        else {
            return `${months} months ago`;
        }
    }
    else {
        if (years == 1) {
            return "one year ago";
        }
        else {
            return `${years} years ago`;
        }
    }
}
exports.lastseen = lastseen;
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
                    ? dates_1.Dates.timeToTimestamp(this.start_time, { inSecs: true }) -
                        dates_1.Dates.timestamp({ inSecs: true })
                    : this.STATUS === exports.TIMELINE_STATUS.ENDS_SOON
                        ? dates_1.Dates.timeToTimestamp(this.finish_time, { inSecs: true }) -
                            dates_1.Dates.timestamp({ inSecs: true })
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
                const days = dates_1.Dates.differenceInDays(dates_1.Dates.timestamp(), dates_1.Dates.timeToTimestamp(this.start_time));
                const hours = Math.floor(((dates_1.Dates.timeToTimestamp(this.start_time, { inSecs: true }) -
                    dates_1.Dates.timestamp({ inSecs: true })) /
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
                const days = dates_1.Dates.differenceInDays(dates_1.Dates.timestamp(), dates_1.Dates.timeToTimestamp(this.finish_time));
                const hours = Math.floor(((dates_1.Dates.timeToTimestamp(this.finish_time, { inSecs: true }) -
                    dates_1.Dates.timestamp({ inSecs: true })) /
                    (60 * 60)) %
                    24);
                const time = this.replacer[1].trim() + " " + days + "d" + " " + hours + "h";
                if (this._onUpdate)
                    this._onUpdate({ status, time });
                return this.finish();
                // ENDED
            }
            else if (status === exports.TIMELINE_STATUS.ENDED) {
                const days = dates_1.Dates.differenceInDays(dates_1.Dates.timestamp(), dates_1.Dates.timeToTimestamp(this.finish_time));
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
        const now_time = dates_1.Dates.ISO();
        switch (true) {
            case now_time < start_time:
                if (dates_1.Dates.timeToTimestamp(start_time) - dates_1.Dates.timestamp() <= _24h) {
                    return exports.TIMELINE_STATUS.STARTS_SOON;
                }
                else {
                    return exports.TIMELINE_STATUS.NOT_STARTED;
                }
            case now_time > finish_time:
                return exports.TIMELINE_STATUS.ENDED;
            case now_time >= start_time && now_time <= finish_time:
                if (dates_1.Dates.timeToTimestamp(finish_time) - dates_1.Dates.timestamp() <= _24h) {
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
//# sourceMappingURL=lastseen.js.map