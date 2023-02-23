"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateII = void 0;
var date_fns_1 = require("date-fns");
exports.DateII = {
    now: function () {
        return Date.now();
    },
    format: function (timestamp, format) {
        return (0, date_fns_1.format)(timestamp, format);
    },
    calculateDifferenceIn: function (left, right, options) {
        if (options.differenceIn === "hours") {
            return (0, date_fns_1.differenceInHours)(left, right);
        }
        else if (options.differenceIn === "days") {
            return (0, date_fns_1.differenceInDays)(left, right);
        }
        else if (options.differenceIn === "months") {
            return (0, date_fns_1.differenceInMonths)(left, right);
        }
        else
            return 0;
    },
    modifyISO: function (timestamp, modifier) {
        return 0;
    },
};
