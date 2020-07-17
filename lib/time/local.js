"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTC2Local = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function UTC2Local(UTC) {
    return moment_timezone_1.default.utc(UTC).format("MMM DD, YYYY");
}
exports.UTC2Local = UTC2Local;
//# sourceMappingURL=local.js.map