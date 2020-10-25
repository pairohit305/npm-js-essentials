import { httpStatusCode } from "../httpStatusCode";

const errorObject = {
  code: 400,
  message: httpStatusCode[400],
};
type HttpReq = {
  [key: string]: any;
};

/**
 * Validate the http's request query-parameter
 */
export async function httpReqValidatorAsync(params: string[], httpReq: HttpReq) {
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
    if (
      (typeof v === "string" || typeof v === "number" || typeof v === "object") &&
      v.toString().length > 0 &&
      httpReq[k] !== undefined &&
      params.includes(k)
    ) {
      checked--;
      return false;
    } else {
      return true;
    }
  });

  if (!(checked === 0)) {
    return Promise.reject(errorObject);
  }

  return true;
}
