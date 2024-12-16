import { ServerResponse } from 'http';
import Application from './application.class';
export declare class Responses<T = Record<string, any>> extends ServerResponse {
}
export default class Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>> extends ServerResponse {
    app: Application;
    locals: Locals;
    statusCode: number;
    /**
     * Sets the HTTP status code for the response.
     * @param code - The HTTP status code to set.
     * @returns The current response instance for method chaining.
     */
    status(code: number): this;
    /**
     * Sets a header for the response.
     * @param field - The name of the header.
     * @param value - The value of the header.
     * @returns The current response instance for method chaining.
     */
    set(field: string, value: string | number | readonly string[]): this;
    /**
     * Sends a response with the specified body and optional status code.
     * @param body - The response body.
     * @returns The current response instance for method chaining.
     */
    send(body: string | Buffer | object): this;
    /**
     * Sends a JSON response.
     * Automatically sets the `Content-Type` header to `application/json`.
     * @param body - The JSON object to send.
     * @returns The current response instance for method chaining.
     */
    json(body: any): this;
    /**
     * Encodes a query string response.
     * This method encodes the provided `body` as a query string.
     * The `Content-Type` header will not be automatically set since this is intended for query string encoding.
     * @param body - The query parameters to encode.
     * @returns The current response instance for method chaining.
     */
    query(body: any): this;
    /**
     * Redirects the client to the specified URL with an optional status code.
     * Defaults to a `302 Found` status if no code is provided.
     * @param url - The URL to redirect to.
     * @param status - The optional HTTP status code for the redirection.
     * @returns The current response instance for method chaining.
     */
    redirect(url: string, status?: number): this;
    /**
     * Appends additional values to a header, creating or extending the header if necessary.
     * @param field - The name of the header.
     * @param value - The value to append to the header.
     * @returns The current response instance for method chaining.
     */
    append(field: string, value: string | string[]): this;
    /**
     * Converts a standard ServerResponse into an instance of the custom Response class.
     *
     * This method sets the prototype of the provided `ServerResponse` object to the `Response` class,
     * allowing access to the custom properties and methods defined in the `Response` class.
     *
     * @param res - The ServerResponse instance from the HTTP server.
     * @returns An instance of the `Response` class with the enhanced functionality.
     */
    static fromServerResponse(res: ServerResponse, app: Application): Response;
}
