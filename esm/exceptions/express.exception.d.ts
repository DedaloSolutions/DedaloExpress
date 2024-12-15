export default class ExpressException<T = any> {
    protected _message: string;
    protected _status: number;
    protected _info?: T;
    constructor(message: string, status: number, info?: T);
    get message(): string;
    get status(): number;
    get info(): T | undefined;
    toJSON(): {
        message: string;
    };
}
