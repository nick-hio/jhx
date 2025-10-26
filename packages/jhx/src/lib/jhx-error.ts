export type JhxErrorAttribute = 'hx-headers' | 'hx-request' | 'hx-vals';

export interface JhxError extends Error {
    attribute: JhxErrorAttribute;
    message:
        | JhxHeadersError['message']
        | JhxRequestError['message']
        | JhxValsError['message']
        | (string & {});
}

export interface JhxHeadersError extends JhxError {
    attribute: 'hx-headers';
    message: "[jhx] Error while parsing 'hx-headers' object";
}

export interface JhxRequestError extends JhxError {
    attribute: 'hx-request';
    message: "[jhx] Error while parsing 'hx-request' object";
}

export interface JhxValsError extends JhxError {
    attribute: 'hx-vals';
    message: "[jhx] Error while parsing 'hx-vals' object";
}

export class JhxErrorThrowable extends Error implements JhxError {
    attribute: JhxErrorAttribute;

    constructor(
        message: JhxError['message'],
        options: {
            attribute: JhxErrorAttribute;
            cause?: unknown;
            stack?: string;
        },
    ) {
        super(message);

        this.name = 'JhxError';
        this.attribute = options.attribute;
        if (options.stack) this.stack = options.stack;
        if (options.cause) this.cause = options.cause;

        Object.setPrototypeOf(this, JhxErrorThrowable.prototype);
    }
}
