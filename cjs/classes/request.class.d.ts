import { IncomingMessage } from 'http';
import Application from './application.class';
interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
export default class Request<P = any, ResBody = any, ReqBody = any, ReqQuery = ParsedQs, Locals extends Record<string, any> = Record<string, any>> extends IncomingMessage {
    baseUrl?: string;
    params: P;
    query: ReqQuery;
    body: ReqBody;
    app: Application;
    cookies: {
        [key: string]: string;
    };
    signedCookies: {
        [key: string]: string;
    };
    /**
     * Retrieves the client's IP address.
     * Uses the socket's remoteAddress property.
     */
    get ip(): string;
    /**
     * Retrieves an array of IP addresses from the `X-Forwarded-For` header, if present.
     * Returns undefined if the header is not set.
     */
    get ips(): string[] | undefined;
    /**
     * Retrieves the original URL of the request, as it was sent by the client.
     */
    get originalUrl(): string;
    /**
     * Retrieves the hostname from the `Host` header. Excludes the port number if present.
     */
    get hostname(): string;
    /**
     * Retrieves the path portion of the request URL, excluding the query string.
     */
    get path(): string;
    /**
     * Determines the protocol of the request (either `http` or `https`).
     * Uses the presence of `socket.encrypted` to determine the protocol.
     */
    get protocol(): string;
    /**
     * Indicates whether the request is secure (uses HTTPS).
     * Returns true if the protocol is `https`.
     */
    get secure(): boolean;
    /**
     * Retrieves the subdomains of the request's hostname.
     * Excludes the top-level domain (TLD) and primary domain.
     * @example
     * For a hostname `api.example.com`, this returns `['api']`.
     */
    get subdomains(): string[];
    /**
     * Retrieves the value of a specific HTTP header from the request.
     *
     * @param name - The name of the header to retrieve (case-insensitive).
     * @returns The value of the header as a string, or `undefined` if not found.
     */
    get(name: string): string | undefined;
    /**
     * Checks if the Content-Type header matches the specified MIME type.
     *
     * @param type - The MIME type to check against (e.g., 'application/json').
     * @returns `true` if the Content-Type matches, otherwise `false`.
     */
    is(type: string): boolean;
    /**
     * Converts a standard IncomingMessage into an instance of the custom Request class.
     *
     * This method sets the prototype of the provided `IncomingMessage` object to the `Request` class,
     * allowing access to the custom properties and methods defined in the `Request` class.
     *
     * @param req - The IncomingMessage instance from the HTTP server.
     * @returns An instance of the `Request` class with the initialized properties.
     */
    static fromIncomingMessage(req: IncomingMessage, app: Application): Request;
}
export {};
