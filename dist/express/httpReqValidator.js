"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpReqValidatorAsync = void 0;
const httpStatusCode_1 = require("../httpStatusCode");
const errorObject = {
    code: 400,
    message: httpStatusCode_1.httpStatusCode[400],
};
/**
 * Validate the http's request query-parameter
 */
function httpReqValidatorAsync(params, httpReq, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // check weather req body is json type
        if (typeof httpReq !== "object") {
            return Promise.reject(errorObject);
        }
        const httpKeys = Object.keys(httpReq).length;
        if (httpKeys < params.length ||
            ((options === null || options === void 0 ? void 0 : options.optionalParams) && httpKeys > options.optionalParams.length + params.length))
            return Promise.reject(errorObject);
        // validating the params
        const result = Object.entries(httpReq).some(([k, v]) => {
            var _a;
            // if any value is falsy
            if (!(v === null || v === void 0 ? void 0 : v.toString().length))
                return true;
            // if key in not present in params or optional params
            return !(params.includes(k) || ((_a = options === null || options === void 0 ? void 0 : options.optionalParams) === null || _a === void 0 ? void 0 : _a.includes(k)));
        });
        if (result)
            return Promise.reject(errorObject);
        return true;
    });
}
exports.httpReqValidatorAsync = httpReqValidatorAsync;
//# sourceMappingURL=httpReqValidator.js.map