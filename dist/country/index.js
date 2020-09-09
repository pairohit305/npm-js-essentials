"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountry = exports.getCountryList = void 0;
const country_json_1 = __importDefault(require("./country.json"));
function getCountryList() {
    return country_json_1.default;
}
exports.getCountryList = getCountryList;
function getCountry(countrycode) {
    return country_json_1.default[countrycode];
}
exports.getCountry = getCountry;
//# sourceMappingURL=index.js.map