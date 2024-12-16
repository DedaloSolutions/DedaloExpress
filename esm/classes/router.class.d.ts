import Application from "./application.class";
import Handler from "../types/handler.type";
import Method from "../types/method.type";
import Middleware from "../types/middleware.type";
import Request from "./request.class";
import Response from "./response.class";
import NextFunction from "../types/next-function.type";
export default class Router {
    protected middlewares: Middleware[];
    protected expressRef: {
        express?: Application;
    };
    /**
       * Registers a custom error handler, replacing the existing one.
       * The provided error handler is invoked when an error occurs, but the `next` function will not propagate the error further.
       * This means the `next` function will not trigger any additional middleware in the stack when called.
       * @param errorHandler A function to handle errors, taking `req`, `res`, `next`, and `exception` as arguments.
       */
    use(errorHandler: (exception: unknown, req: Request, res: Response, next: NextFunction) => void): void;
    /**
     * Register a stack for every HTTP method and URL
     * @param handlers The stack of handlers
     */
    use(...handlers: Handler[]): void;
    /**
     * Register a stack for every HTTP method and a specific url
     * @param url The URL
     * @param handlers The stack of handlers
     */
    use(url: string, ...handlers: Handler[]): void;
    /**
     * Register a stack for a specific HTTP method and URL
     * @param method The HTTP method
     * @param url The URL
     * @param handlers The stack of handlers
     */
    use(method: Method, url: string, ...handlers: Handler[]): void;
    /**
     * Registers a controller
     *
     * This method extracts the base URL and router instance from the provided
     * controller class using `Router.fromController`. It then registers the
     * extracted router at the specified base URL within the current router instance.
     *
     * @param controller - A class constructor (newable) representing the controller
     *                     to be registered. The controller's routing logic is
     *                     expected to be defined within its metadata or methods.
     */
    register(controller: new (...args: any[]) => any): void;
    /**
     * Register all the controllers inside a directory
     * @param directory The full path of the directory that contains the controllers
     * @param filter The regex to filter out the file; By default a controller name ends with .controller.ts|js
     */
    registerFrom(directory?: string, filter?: RegExp): Promise<void>;
    /**
     * Handles an incoming HTTP request by finding the matching middleware
     * and executing its handlers in sequence.
     * @param req The incoming HTTP request
     * @param res The outgoing HTTP response
     * @returns False if the handling shouldn't continue, otherwise true
     */
    protected handle(req: Request, res: Response): Promise<boolean>;
    /**
     * Registers a stack for a GET request for every url
     * @param handlers The stack of handlers
     */
    get(...handlers: Handler[]): void;
    /**
     * Registers a stack for a GET request with the specified URL and handlers.
     * @param url - The URL pattern to match.
     * @param handlers - The handlers to execute for the GET request.
     */
    get(url: string, ...handlers: Handler[]): void;
    /**
     * Registers a stack for a POST request for every URL.
     * @param handlers The stack of handlers.
     */
    post(...handlers: Handler[]): void;
    /**
     * Registers a stack for a POST request with the specified URL and handlers.
     * @param url - The URL pattern to match.
     * @param handlers - The handlers to execute for the POST request.
     */
    post(url: string, ...handlers: Handler[]): void;
    /**
     * Registers a stack for a PUT request for every URL.
     * @param handlers The stack of handlers.
     */
    put(...handlers: Handler[]): void;
    /**
     * Registers a stack for a PUT request with the specified URL and handlers.
     * @param url - The URL pattern to match.
     * @param handlers - The handlers to execute for the PUT request.
     */
    put(url: string, ...handlers: Handler[]): void;
    /**
     * Registers a stack for a PATCH request for every URL.
     * @param handlers The stack of handlers.
     */
    patch(...handlers: Handler[]): void;
    /**
     * Registers a stack for a PATCH request with the specified URL and handlers.
     * @param url - The URL pattern to match.
     * @param handlers - The handlers to execute for the PATCH request.
     */
    patch(url: string, ...handlers: Handler[]): void;
    /**
     * Registers a stack for an OPTIONS request for every URL.
     * @param handlers The stack of handlers.
     */
    options(...handlers: Handler[]): void;
    /**
     * Registers a stack for an OPTIONS request with the specified URL and handlers.
     * @param url - The URL pattern to match.
     * @param handlers - The handlers to execute for the OPTIONS request.
     */
    options(url: string, ...handlers: Handler[]): void;
    /**
     * Registers a stack for a DELETE request for every URL.
     * @param handlers The stack of handlers.
     */
    delete(...handlers: Handler[]): void;
    /**
     * Registers a stack for a DELETE request with the specified URL and handlers.
     * @param url - The URL pattern to match.
     * @param handlers - The handlers to execute for the DELETE request.
     */
    delete(url: string, ...handlers: Handler[]): void;
    /**
     * Creates a route configuration based on the provided controller class.
     *
     * This static method accepts a controller class and extracts metadata or methods
     * to define routing logic. It returns a tuple containing:
     * 1. A base URL string representing the root path for the controller's routes.
     * 2. An instance of a Router that contains the associated route handlers.
     *
     * @param controller - A class constructor (newable) representing the controller
     *                     from which the routes will be derived.
     * @returns A tuple with the base route path and the configured Router instance.
     */
    static fromController(controller: new (...args: any[]) => any): [string, Router];
}
