import Router from "../classes/router.class";
import Request from "../classes/request.class";
import Response from "../classes/response.class";
import NextFunction from "./next-function.type";
type FnHandler<Req extends Request = Request, Res extends Response = Response> = ((req: Req, res: Res) => boolean | void | Promise<boolean | void>) | ((req: Req, res: Res, next: NextFunction) => boolean | void | Promise<boolean | void>);
type Handler = Router | FnHandler;
export default Handler;
