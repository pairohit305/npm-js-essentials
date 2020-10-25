"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFormateDate = void 0;
const date_fns_1 = require("date-fns");
function toFormateDate(utcDate) {
    return date_fns_1.format(new Date(utcDate), "do MMM, yyyy");
}
exports.toFormateDate = toFormateDate;
//# sourceMappingURL=local.js.map