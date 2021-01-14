"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = exports.TIMELINE_STATUS = exports.lastseen = void 0;
const dates_1 = require("./dates");
/** 1604247241_000 -> yesterday */
function lastseen(timestamp) {
    var differenceTime = dates_1.timestamp() - timestamp;
    var seconds = differenceTime;
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
/**
 *       24h before startDate(STARTS_TOMARROW)                   *
 *                 |                                             *
 *                 |       24h before endDate(ENDS_TODAY)        *
 *                 |                   |                         *
 *                 v                   v                         *
 * (NOT_STARTED)-- * -- * ============ * -- * ------             *
 *                      ^                   ^                    *
 *                      |                   |                    *
 *                      |           endDate(ENDED)               *
 *                      |                                        *
 *         startDate(STARTED_IN_BETWEEN)                         *
 *                                                               *
 *    = Our main event                                           *
 *    * Breakpoint                                               *
 *                                                               *
 */
exports.TIMELINE_STATUS = {
    NOT_STARTED: 0,
    STARTS_TOMARROW: 1,
    STARTED_IN_BETWEEN: 2,
    ENDS_TODAY: 3,
    ENDED: 4,
    UNKNOWN: 5,
    INVALID: 6,
};
class Timeline {
    constructor(startDateString, endDateString, 
    /** It is time when it switches from 60s interval to 1s interval
     *  and this gives awesome ux, so if you provide value 120 it means
     * if 120 or less seconds remaining then update every 1s
      */
    SWITCH_SECONDS = 120, 
    /**
     * IF you provide number in this, then it will work
     * just like any other countdown ex 20 secs count down
     *
     */
    COUNTDOWN_SECONDS = undefined, text) {
        this.startDateString = startDateString;
        this.endDateString = endDateString;
        this.SWITCH_SECONDS = SWITCH_SECONDS;
        this.COUNTDOWN_SECONDS = COUNTDOWN_SECONDS;
        this.text = text;
        this.STATUS = exports.TIMELINE_STATUS.UNKNOWN;
        this.timeString = " - ";
        this.updateTime = this.updateTime.bind(this);
    }
    init() {
        var _a, _b, _c;
        if (this.COUNTDOWN_SECONDS) {
            this.STATUS = exports.TIMELINE_STATUS.ENDS_TODAY;
            this.MODE = 0;
            this.time = this.COUNTDOWN_SECONDS;
            this.intervalPeriod = 1000;
        }
        else {
            // set the status
            this.STATUS = this.getStatus();
            // set MODE
            this.MODE =
                this.STATUS === exports.TIMELINE_STATUS.STARTS_TOMARROW ||
                    this.STATUS === exports.TIMELINE_STATUS.ENDS_TODAY
                    ? 0
                    : 1;
            // set time
            this.time = dates_1.timeLeft24h(true) + 100;
            //  set interval
            this.intervalPeriod =
                this.MODE === 0
                    ? this.time <= this.SWITCH_SECONDS
                        ? 1000
                        : 60000
                    : undefined;
        }
        if (this.intervalPeriod) {
            // start the timer on logic
            if (this.updateCB) {
                this.updateTimeString();
                this.updateCB({ time: this.timeString, status: this.STATUS });
            }
            this.timer = setInterval(this.updateTime, this.intervalPeriod);
        }
        else {
            // no timer required hence static o/p
            switch (this.STATUS) {
                case exports.TIMELINE_STATUS.NOT_STARTED: {
                    const diff = dates_1.dateStringDifference(dates_1.dateString(), this.startDateString);
                    this.timeString = `${((_a = this.text) === null || _a === void 0 ? void 0 : _a.NOT_STARTED) || "Starts in"} ${diff}d`;
                    break;
                }
                case exports.TIMELINE_STATUS.STARTED_IN_BETWEEN: {
                    const diff = dates_1.dateStringDifference(dates_1.dateString(), this.endDateString);
                    this.timeString = `${((_b = this.text) === null || _b === void 0 ? void 0 : _b.STARTED) || "Ends in"} ${diff + 1}d`;
                    break;
                }
                case exports.TIMELINE_STATUS.ENDED: {
                    this.timeString = ((_c = this.text) === null || _c === void 0 ? void 0 : _c.ENDED) || "Ended";
                    break;
                }
            }
            if (this.updateCB) {
                this.updateCB({ time: this.timeString, status: this.STATUS });
            }
        }
    }
    static getStatus(startDateString, endDateString) {
        const aj = dates_1.dateString();
        if (startDateString > endDateString)
            return exports.TIMELINE_STATUS.INVALID;
        if (endDateString === aj) {
            return exports.TIMELINE_STATUS.ENDS_TODAY;
        }
        else if (startDateString > aj) {
            const diff = dates_1.dateStringDifference(aj, startDateString);
            if (diff === 1) {
                return exports.TIMELINE_STATUS.STARTS_TOMARROW;
            }
            else {
                return exports.TIMELINE_STATUS.NOT_STARTED;
            }
        }
        else if (aj >= startDateString && aj <= endDateString) {
            return exports.TIMELINE_STATUS.STARTED_IN_BETWEEN;
        }
        else if (aj > endDateString) {
            return exports.TIMELINE_STATUS.ENDED;
        }
        else {
            return exports.TIMELINE_STATUS.INVALID;
        }
    }
    getStatus() {
        const { startDateString, endDateString } = this;
        const aj = dates_1.dateString();
        if (startDateString > endDateString)
            return exports.TIMELINE_STATUS.INVALID;
        if (endDateString === aj) {
            return exports.TIMELINE_STATUS.ENDS_TODAY;
        }
        else if (startDateString > aj) {
            const diff = dates_1.dateStringDifference(aj, startDateString);
            if (diff === 1) {
                return exports.TIMELINE_STATUS.STARTS_TOMARROW;
            }
            else {
                return exports.TIMELINE_STATUS.NOT_STARTED;
            }
        }
        else if (aj >= startDateString && aj <= endDateString) {
            return exports.TIMELINE_STATUS.STARTED_IN_BETWEEN;
        }
        else if (aj > endDateString) {
            return exports.TIMELINE_STATUS.ENDED;
        }
        else {
            return exports.TIMELINE_STATUS.INVALID;
        }
    }
    updateTime() {
        // err checking
        if (!this.intervalPeriod || !this.time)
            return;
        // time logic
        if (this.time <= this.SWITCH_SECONDS && this.time > 1) {
            if (this.intervalPeriod !== 1000) {
                clearInterval(this.timer);
                this.intervalPeriod = 1000;
                this.time = this.time - 60;
                this.timer = setInterval(this.updateTime, 1000);
            }
            else {
                this.time = this.time - 1;
            }
        }
        else if (this.time <= 1) {
            clearInterval(this.timer);
            this.timer = undefined;
            this.MODE = undefined;
            this.STATUS = exports.TIMELINE_STATUS.ENDED;
            this.intervalPeriod = undefined;
            this.time = 0;
            this.timeString = ' - ';
            if (this.updateCB)
                this.updateCB({ time: this.timeString, status: this.STATUS });
            if (this.finishCB) {
                this.finishCB();
            }
            return;
        }
        else {
            this.time = this.time - 60;
            if (this.time <= this.SWITCH_SECONDS && this.time > 1) {
                clearInterval(this.timer);
                this.intervalPeriod = 1000;
                this.timer = setInterval(this.updateTime, 1000);
            }
        }
        this.updateTimeString();
        if (this.updateCB) {
            this.updateCB({ time: this.timeString, status: this.STATUS });
        }
    }
    updateTimeString() {
        var _a, _b;
        if (!this.time)
            return;
        let hours = Math.floor((this.time / (60 * 60)) % 24);
        let minutes = Math.floor((this.time / 60) % 60);
        let seconds = Math.floor(this.time % 60);
        if (this.time <= this.SWITCH_SECONDS)
            hours = null;
        if (this.time > this.SWITCH_SECONDS)
            seconds = null;
        hours = this.setDoubleDigit(hours, "h");
        minutes = this.setDoubleDigit(minutes, "m");
        seconds = this.setDoubleDigit(seconds, "s");
        if (this.STATUS === exports.TIMELINE_STATUS.ENDS_TODAY) {
            this.timeString = `${((_a = this.text) === null || _a === void 0 ? void 0 : _a.ENDS_TODAY) || "Ends in"} ${hours}${minutes}${seconds}`.trim();
        }
        else {
            this.timeString = `${((_b = this.text) === null || _b === void 0 ? void 0 : _b.STARTS_TOMARROW) || "Starts in"} ${hours}${minutes}${seconds}`.trim();
        }
    }
    setDoubleDigit(digit, append) {
        if (digit === null)
            return "";
        return ((digit.toString().length === 1 ? "0" + digit : digit.toString()) +
            append +
            " ");
    }
    /** events */
    onStart(callback) {
        this.startCB = callback;
    }
    onUpdate(callback) {
        this.updateCB = callback;
    }
    onFinish(callback) {
        this.finishCB = callback;
    }
    /** pause the time */
    pause() {
        clearInterval(this.timer);
    }
    /** resume the time */
    resume() {
        this.init();
    }
    /** start the time */
    start() {
        if (this.startCB) {
            this.startCB();
        }
        this.init();
    }
    /** stop the time */
    stop() {
        clearInterval(this.timer);
    }
    /** Restart the timer with new */
    restart(startDateString, endDateString) {
        this.startDateString = startDateString;
        this.endDateString = endDateString;
        // init again
        this.init();
    }
}
exports.Timeline = Timeline;
//# sourceMappingURL=lastseen.js.map