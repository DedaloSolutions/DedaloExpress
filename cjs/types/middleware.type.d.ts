import Handler from "./handler.type";
import Method from "./method.type";
type Middleware = {
    method: Method;
    urlPattern?: RegExp;
    paramKeys: string[];
    handlers: Handler[];
};
export default Middleware;
