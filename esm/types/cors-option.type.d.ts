import Method from "./method.type";
/**
 * Defines the options for configuring Cross-Origin Resource Sharing (CORS) on an endpoint.
 *
 * These options control various aspects of the CORS protocol, such as which origins
 * are allowed to make requests, the permitted HTTP methods, allowed request headers,
 * and caching behavior for CORS preflight requests.
 *
 * @type {CorsOption}
 *
 * @property {string | string[]} [origin] The allowed origins that can make requests to the endpoint.
 *                                       This can be a single origin or an array of allowed origins.
 * @property {Exclude<Method, '*'> | Array<Exclude<Method, '*'>>} [methods] The allowed HTTP methods
 *                                                                  for requests to the endpoint (e.g., `GET`, `POST`).
 *                                                                  You can specify a single method or an array of methods.
 * @property {string | string[]} [allowedHeaders] The allowed headers in the request for this endpoint.
 *                                                Can be a single header or an array of headers.
 * @property {boolean} [credentials] Indicates whether the browser should include credentials (cookies, HTTP
 *                                   authentication, and client-side SSL certificates) in the request.
 * @property {number} [maxAge] The maximum time (in seconds) that the browser should cache the CORS response
 *                             for the preflight request. This controls how often the browser will send
 *                             preflight requests to check CORS permissions.
 */
type CorsOption = {
    origin?: string | string[];
    methods?: Exclude<Method, '*'> | Array<Exclude<Method, '*'>>;
    allowedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
};
export default CorsOption;
