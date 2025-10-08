export type HtmxErrorAttribute = 'hx-vals' | 'hx-request';

export interface JhxError extends Error {
    attribute: HtmxErrorAttribute;
    message: JhxValsError['message'] | JhxRequestError['message'] | (string & {});
}

export interface JhxValsError extends JhxError {
    attribute: 'hx-vals';
    message: "[jhx] Error while parsing 'hx-vals' object";
}

export interface JhxRequestError extends JhxError {
    attribute: 'hx-request';
    message: "[jhx] Error while parsing 'hx-request' object";
}

export class JhxErrorThrowable extends Error implements JhxError {
    attribute: HtmxErrorAttribute;

    constructor(
        message: JhxValsError['message'] | JhxRequestError['message'] | (string & {}),
        options: {
            attribute: HtmxErrorAttribute;
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
