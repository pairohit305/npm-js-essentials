"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateII = void 0;
const date_fns_1 = require("date-fns");
exports.DateII = {
    getISO(options) {
        var _a, _b;
        let ISO = (_a = options === null || options === void 0 ? void 0 : options.reference) !== null && _a !== void 0 ? _a : new Date().toISOString();
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
    convertTimestampToISO(timestamp) {
        return new Date(timestamp).toISOString();
    },
    getInputDate(ISO) {
        return (0, date_fns_1.parseISO)(ISO).toISOString().slice(0, 10);
    },
    getInputDateTime(ISO) {
        return (0, date_fns_1.parseISO)(ISO).toISOString().slice(0, 16);
    },
};
//# sourceMappingURL=index.js.map