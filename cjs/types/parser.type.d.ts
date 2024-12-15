import Request from "./request.type";
import Response from "./response.type";
/**
 * Represents a parser for request and response handling.
 *
 * @template T - The type of the data to be parsed and returned.
 *
 * @property {function} match - Evaluates the request to determine if the body is parsable.
 * @property {function} decode - Extracts data from the request and populates the query or body.
 * @property {function} encode - Takes the output data and formats it for the response.
 */
type Parser<T = any> = {
    match: (req: Request) => boolean;
    decode: (req: Request) => void;
    encode: (body: T, res: Response) => void;
};
export default Parser;
