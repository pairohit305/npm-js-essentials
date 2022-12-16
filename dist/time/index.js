"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateII = void 0;
var date_fns_1 = require("date-fns");
exports.DateII = {
    getISO: function (options) {
        var _a, _b;
        var ISO = (_a = options === null || options === void 0 ? void 0 : options.reference) !== null && _a !== void 0 ? _a : new Date().toISOString();
        if ((options === null || options === void 0 ? void 0 : options.modifier) === "start-of-month") {
        }
        else if ((options === null || options === void 0 ? void 0 : options.modifier) === "end-of-month") {
        }
        else if ((_b = options === null || options === void 0 ? void 0 : options.modifier) === null || _b === void 0 ? void 0 : _b.match(/alter-by-\(((-|\+|)\d+)\)-days/)) {
        }
        if ((options === null || options === void 0 ? void 0 : options.representation) === "dime") {
            return ISO.split("T")[0];
        }
        if ((options === null || options === void 0 ? void 0 : options.representation) === "timestamp") {
            return (0, date_fns_1.parseISO)(ISO).getTime().toString();
        }
        return ISO;
    },
    convertTimestampToISO: function (timestamp) {
        return new Date(timestamp).toISOString();
    },
    formatISO: function (ISO, format) {
        return (0, date_fns_1.format)((0, date_fns_1.parseISO)(ISO), format);
    },
};
