"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateII = void 0;
var date_fns_1 = require("date-fns");
exports.DateII = {
    getISO: function () {
        return new Date().toISOString();
    },
    getTimestamp: function () {
        return Date.now();
    },
    convertTimestampToISO: function (timestamp) {
        return new Date(timestamp).toISOString();
    },
    formatISO: function (ISO, format) {
        return (0, date_fns_1.format)((0, date_fns_1.parseISO)(ISO), format);
    },
    formatTimestamp: function (timestamp, format) {
        return (0, date_fns_1.format)(timestamp, format);
    },
    getISOdifferenceIn: function (leftISO, rightISO, options) {
        if (options.differenceIn === "hours") {
            return (0, date_fns_1.differenceInHours)((0, date_fns_1.parseISO)(leftISO), (0, date_fns_1.parseISO)(rightISO));
        }
        else if (options.differenceIn === "days") {
            return (0, date_fns_1.differenceInDays)((0, date_fns_1.parseISO)(leftISO), (0, date_fns_1.parseISO)(rightISO));
        }
        else if (options.differenceIn === "months") {
            return (0, date_fns_1.differenceInMonths)((0, date_fns_1.parseISO)(leftISO), (0, date_fns_1.parseISO)(rightISO));
        }
        else
            return 0;
    },
    modifyISO: function (ISO, modifier) {
        return ISO;
    },
};
