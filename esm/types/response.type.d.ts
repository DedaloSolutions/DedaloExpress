import { ServerResponse } from 'http';
type Response<T = Record<string, any>> = ServerResponse & {
    locals: T;
    status: (statusCode: number) => Response;
    json: (data: any) => Response;
    query: (data: any) => Response;
};
export default Response;
