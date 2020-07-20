"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpReqValidatorAsync = void 0;
const errorObject = {
    code: 400,
    message: "Provided incorrect parameters for the request",
};
async function httpReqValidatorAsync(params, httpReq) {
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
        if ((typeof v === "string" || typeof v === "number") &&
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
}
exports.httpReqValidatorAsync = httpReqValidatorAsync;
//# sourceMappingURL=httpReqValidator.js.map