"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateII = void 0;
var date_fns_1 = require("date-fns");
exports.DateII = {
    now: function () {
        return Date.now();
    },
    util: function (date, mode) {
        if (mode === "start-of-minute") {
            return (0, date_fns_1.startOfMinute)(date).getTime();
        }
        if (mode === "start-of-hour") {
            return (0, date_fns_1.startOfHour)(date).getTime();
        }
        if (mode === "start-of-day") {
            return (0, date_fns_1.startOfDay)(date).getTime();
        }
        if (mode === "start-of-month") {
            return (0, date_fns_1.startOfMonth)(date).getTime();
        }
        if (mode === "end-of-minute") {
            return (0, date_fns_1.endOfMinute)(date).getTime();
        }
        if (mode === "end-of-hour") {
            return (0, date_fns_1.endOfHour)(date).getTime();
        }
        if (mode === "end-of-day") {
            return (0, date_fns_1.endOfDay)(date).getTime();
        }
        if (mode === "end-of-month") {
            return (0, date_fns_1.endOfMonth)(date).getTime();
        }
        return 0;
    },
    format: function (date, format) {
        return (0, date_fns_1.format)(date, format);
    },
    calculate: function (leftDate, rightDate, options) {
        if (options.differenceIn === "minutes") {
            return (0, date_fns_1.differenceInMinutes)(leftDate, rightDate);
        }
        if (options.differenceIn === "hours") {
            return (0, date_fns_1.differenceInHours)(leftDate, rightDate);
        }
        if (options.differenceIn === "days") {
            return (0, date_fns_1.differenceInDays)(leftDate, rightDate);
        }
        if (options.differenceIn === "months") {
            return (0, date_fns_1.differenceInMonths)(leftDate, rightDate);
        }
        return 0;
    },
    modify: function (date, modifier) {
        if (modifier.match(/^alter-by-\(-?\d+\)-minutes$/)) {
            var minutes = +modifier.match(/^alter-by-\((-?\d+)\)-minutes$/)[1];
            if (minutes === 0)
                return date;
            return minutes > 0
                ? (0, date_fns_1.addMinutes)(date, minutes).getTime()
                : (0, date_fns_1.subMinutes)(date, Math.abs(minutes)).getTime();
        }
        if (modifier.match(/^alter-by-\(-?\d+\)-hours$/)) {
            var hours = +modifier.match(/^alter-by-\((-?\d+)\)-hours$/)[1];
            if (hours === 0)
                return date;
            return hours > 0
                ? (0, date_fns_1.addHours)(date, hours).getTime()
                : (0, date_fns_1.subHours)(date, Math.abs(hours)).getTime();
        }
        if (modifier.match(/^alter-by-\(-?\d+\)-days$/)) {
            var days = +modifier.match(/^alter-by-\((-?\d+)\)-days$/)[1];
            if (days === 0)
                return date;
            return days > 0
                ? (0, date_fns_1.addDays)(date, days).getTime()
                : (0, date_fns_1.subDays)(date, Math.abs(days)).getTime();
        }
        if (modifier.match(/^alter-by-\(-?\d+\)-months$/)) {
            var months = +modifier.match(/^alter-by-\((-?\d+)\)-months$/)[1];
            if (months === 0)
                return date;
            return months > 0
                ? (0, date_fns_1.addMonths)(date, months).getTime()
                : (0, date_fns_1.subMonths)(date, Math.abs(months)).getTime();
        }
        return 0;
    },
};
