import type { Context as HonoContext } from 'hono';

const isResponseSent = (context: any) => {
    return context?.finalized === true;
};

export const isResponseHandled = (context: HonoContext, handlerResult: any) => {
    return (
        isResponseSent(context)
        || handlerResult instanceof Response
        || handlerResult instanceof ReadableStream
    );
};
