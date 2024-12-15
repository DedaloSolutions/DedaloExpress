import { IncomingMessage } from 'http';
type Request = IncomingMessage & {
    params: {
        [key: string]: string;
    };
    query: {
        [key: string]: string | string[];
    };
    body: any;
};
export default Request;
