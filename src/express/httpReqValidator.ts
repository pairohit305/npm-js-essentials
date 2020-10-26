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
export async function httpReqValidatorAsync(
  params: string[],
  httpReq: HttpReq,
  options?: { optionalParams?: string[] }
) {
  // check weather req body is json type
  if (typeof httpReq !== "object") {
    return Promise.reject(errorObject);
  }

  const httpKeys = Object.keys(httpReq).length;
  if (
    httpKeys < params.length ||
    (options?.optionalParams && httpKeys > options.optionalParams.length + params.length)
  )
    return Promise.reject(errorObject);

  // validating the params
  const result = Object.entries(httpReq).some(([k, v]) => {
    // if any value is falsy
    if (!v?.toString().length) return true;

    // if key in not present in params or optional params
    return !(params.includes(k) || options?.optionalParams?.includes(k));
  });

  if (result) return Promise.reject(errorObject);

  return true;
}
