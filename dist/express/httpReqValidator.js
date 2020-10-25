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
function httpReqValidatorAsync(params, httpReq) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkCount = params.length;
        let checked = checkCount;
        // check weather req body is json type
        if (typeof httpReq !== "object") {
            return Promise.reject(errorObject);
        }
        // check httpReq has correct no of params which is required
        if (Object.keys(httpReq).length !== checkCount) {
            return Promise.reject(errorObject);
        }
        // validate
        Object.entries(httpReq).some(([k, v]) => {
            if ((typeof v === "string" || typeof v === "number" || typeof v === "object") &&
                v.toString().length > 0 &&
                httpReq[k] !== undefined &&
                params.includes(k)) {
                checked--;
                return false;
            }
            else {
                return true;
            }
        });
        if (!(checked === 0)) {
            return Promise.reject(errorObject);
        }
        return true;
    });
}
exports.httpReqValidatorAsync = httpReqValidatorAsync;
//# sourceMappingURL=httpReqValidator.js.map