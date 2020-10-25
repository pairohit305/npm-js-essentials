"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryFullname = exports.getCountryList = void 0;
const country_json_1 = __importDefault(require("./country.json"));
/**
 * Get the all country code list
 */
function getCountryList() {
    return country_json_1.default;
}
exports.getCountryList = getCountryList;
/**
 * By providing country code you get full name
 * @param code Country Code
 */
function getCountryFullname(code) {
    return country_json_1.default[code];
}
exports.getCountryFullname = getCountryFullname;
//# sourceMappingURL=index.js.map