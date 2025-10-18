import type { Context as ElysiaContext } from 'elysia';

const isElysiaContext = (obj: any): obj is ElysiaContext => {
    return (
        obj
        && typeof obj === 'object'
        && 'body' in obj
        && 'request' in obj
        && 'path' in obj
        && 'server' in obj
        && 'set' in obj
        && 'status' in obj
    );
};

const isResponseSent = (context: any) => {
    return (
        !!(context.responseValue || context.response)
        || typeof context.set?.redirect === 'string'
        || !!context.set?.stream
        || !!context.streamWriter
        || !!context._streaming
    );
};

export const isResponseHandled = (context: ElysiaContext, handlerResult: any): boolean => {
    return (
        isResponseSent(context)
        || context === handlerResult
        || isElysiaContext(handlerResult)
        || handlerResult instanceof Response
        || handlerResult instanceof ReadableStream
    );
};
