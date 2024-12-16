import "reflect-metadata";
import { Server } from "http";
import Router from "./router.class";
import Request from "./request.class";
import Response from "./response.class";
import Handler from "../types/handler.type";
import Parser from "../types/parser.type";
import CorsOption from "../types/cors-option.type";
import ServeOption from "../types/serve.option.type";
export default class Application extends Router {
    protected server?: Server;
    protected parsers: {
        [name: string]: Parser;
    };
    constructor();
    /**
     * Starts the HTTP server
     * @param port The port of the HTTP server
     * @returns The native instance of Server from the http package
     */
    listen(port?: number, callback?: () => void): Promise<Server>;
    /**
     * Returns true if the server is currently listening to requests
     */
    get listening(): boolean;
    /**
     * Returns the native instance of Server from the 'http' package
     */
    get native(): Server | undefined;
    /**
     * Stops the HTTP server
     */
    close(): Promise<void>;
    /**
     * Error-handling function. This is called on exception when handling a request
     * @param req The request object from the HTTP server
     * @param res The response object from the HTTP server
     * @param exception The exception that have been raised
     */
    onError(req: Request, res: Response, exception: unknown): void | Promise<void>;
    /**
     * Adds a parser to decode and encode data from the request
     * @param name The name of the parser
     * @param parser The parser object
     */
    addParser(name: string, parser: Parser): void;
    /**
     * Creates a CORS middleware handler to manage CORS preflight requests (OPTIONS).
     *
     * This handler intercepts requests with the `OPTIONS` method and, if the request is a preflight request,
     * writes the appropriate CORS headers to the response and terminates the request-response cycle. For all
     * other request methods (such as `GET`, `POST`, etc.), it allows the request to proceed to the next middleware
     * or handler in the stack.
     *
     * @param options The configuration options for CORS. These options control various aspects of the CORS behavior
     *                for the specified endpoint:
     *                - `origin`: Defines the allowed origins for cross-origin requests. This can be a single origin (string) or
     *                            an array of origins. If not specified, the default behavior is to allow all origins.
     *                - `methods`: Specifies which HTTP methods are allowed for the CORS request. This can be a single method (string)
     *                             or an array of methods (e.g., `['GET', 'POST']`). The default is to allow all methods.
     *                - `allowedHeaders`: Defines the request headers that are allowed in the CORS request. This can be a single header
     *                                    (string) or an array of headers (e.g., `['Content-Type', 'Authorization']`).
     *                                    If not specified, all headers are allowed.
     *                - `credentials`: If set to `true`, the browser will include credentials (such as cookies or HTTP authentication)
     *                                 with the request. By default, credentials are not included (false).
     *                - `maxAge`: Specifies the maximum duration (in seconds) that the browser should cache the CORS response for
     *                            preflight requests. This helps to reduce the number of preflight requests made by the browser.
     *                            If not set, the default value is `0`, meaning no caching.
     *
     * @returns A handler function that applies the CORS headers to preflight requests and continues the request
     *          stack for other methods.
     */
    static cors(options: CorsOption): Handler;
    /**
     * Creates a middleware function that serves static files from a specified directory.
     *
     * This middleware serves files from the specified directory, handling requests for static
     * resources like HTML, CSS, JavaScript, and image files. It also supports additional configuration
     * for caching, MIME types, default files, and allowed file extensions.
     *
     * @param directoryPath The path to the directory where static files are located.
     *                      This can be either an absolute or relative path.
     * @param options Optional configuration to customize the file serving behavior:
     *                - `cacheControl`: If set to `true`, includes cache control headers (`Cache-Control`), such as `max-age`. Default is `false`.
     *                - `maxAge`: The maximum duration (in seconds) the browser can use the cached file before requesting it again. Default is `0` (no caching).
     *                - `mimeTypes`: A record of MIME types to use for the `Content-Type` header. You can map file extensions to MIME types (e.g., `{'html': 'text/html'}`).
     *                - `defaultFile`: The default file to serve when the request points to a directory. Default is `"index.html"`.
     *                - `allowedExtensions`: An array of file extensions (starting with a dot, e.g., `.html`, `.css`) that are allowed to be served. Files with extensions not in this list will be blocked.
     *
     * @returns A middleware function that can be used in an HTTP server to serve static files.
     *          It processes GET requests, checks if the requested file exists, serves the file,
     *          and applies cache control, MIME types, default file handling, and extension restrictions based on the provided options.
     */
    static serve(directoryPath: string, options?: ServeOption): Handler;
}