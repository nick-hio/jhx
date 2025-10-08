export type JhxServerErrorType =
    | 'routes:invalid'
    | 'route:invalid-method'
    | 'route:invalid-path'
    | 'route:invalid-handler'
    | 'route:duplicate'
    | 'endpoint:invalid'
    | 'endpoint:malformed'
    | 'hash:invalid'
    | 'handler:error'
    | 'middleware:error';

export interface JhxServerError extends Error {
    type: JhxServerErrorType;
    info: string;
    message: string;
    method?: string;
    route?: string;
    cause?: unknown;
}

export class JhxServerException extends Error implements JhxServerError {
    type: JhxServerErrorType;
    info: string;
    method?: string;
    route?: string;
    cause?: unknown;

    constructor(
        message: string,
        options: {
            type: JhxServerErrorType;
            info?: string;
            method?: string;
            route?: string;
            cause?: unknown;
            stack?: string;
        },
    ) {
        super(message);

        this.name = 'JhxServerError';
        this.type = options.type;
        this.info = options.info || (options.cause as Error)?.message || message;
        this.method = options.method;
        this.route = options.route;
        this.stack = options.stack;
        this.cause = options.cause;

        Object.setPrototypeOf(this, JhxServerException.prototype);
    }
}
