/**
 * Defines the options for configuring the behavior of a static file server.
 *
 * These options control various aspects of how static files are served, such as caching, MIME type handling,
 * file extensions, and default file serving for directory requests.
 *
 * @type {ServeOption}
 *
 * @property {boolean} [cacheControl] If `true`, enables the inclusion of cache control headers (`Cache-Control`, `Expires`)
 *                                    to manage browser caching. This option is disabled by default.
 * @property {number} [maxAge] The maximum number of seconds the browser should cache the file.
 *                              If `cacheControl` is enabled, this sets the `max-age` directive in the `Cache-Control` header.
 *                              The default is `0` seconds, meaning no caching.
 * @property {Record<string, string>} [mimeTypes] A custom mapping of file extensions to MIME types used in the `Content-Type` header.
 *                                                This allows customization of the MIME types for different file types served by the server.
 * @property {string} [defaultFile] The default file to serve when a directory is requested. For example, if a request is made
 *                                  to `/images/`, this option will append a default file (e.g., `index.html`) to the path.
 *                                  The default value is `index.html`.
 * @property {string[]} [allowedExtensions] A list of file extensions (including the leading dot) that are allowed to be served to the browser.
 *                                          Any file with an extension not included in this list will not be served.
 */
type ServeOption = {
    cacheControl?: boolean;
    maxAge?: number;
    mimeTypes?: Record<string, string>;
    defaultFile?: string;
    allowedExtensions?: string[];
};
export default ServeOption;
