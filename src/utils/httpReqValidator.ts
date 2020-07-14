const errorObject = {
  code: 400,
  message: "Provided incorrect parameters for the request",
};
type HttpReq = {
  [key: string]: any;
};
export async function httpReqValidatorAsync(
  params: string[],
  httpReq: HttpReq
) {
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
      typeof v === "string" &&
      v.length > 0 &&
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
