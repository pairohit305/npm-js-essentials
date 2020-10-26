declare type HttpReq = {
    [key: string]: any;
};
/**
 * Validate the http's request query-parameter
 */
export declare function httpReqValidatorAsync(params: string[], httpReq: HttpReq, options?: {
    optionalParams?: string[];
}): Promise<boolean>;
export {};
//# sourceMappingURL=httpReqValidator.d.ts.map