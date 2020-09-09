"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTC2Local = void 0;
const date_fns_1 = require("date-fns");
function UTC2Local(UTC) {
    return date_fns_1.format(new Date(UTC), "do MMM, yyyy");
}
exports.UTC2Local = UTC2Local;
//# sourceMappingURL=local.js.map