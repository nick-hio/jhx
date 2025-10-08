import type { Context as HonoContext } from 'hono';

const isHonoContext = (value: any): value is HonoContext => {
    return (
        value
        && typeof value === 'object'
        && 'finalized' in value
        && 'render' in value
        && 'body' in value
        && 'text' in value
        && 'json' in value
        && 'html' in value
    );
};

const isResponseSent = (context: any) => {
    return context?.finalized === true;
};

export const isResponseHandled = (context: HonoContext, handlerResult: any) => {
    return (
        isResponseSent(context)
        || context === handlerResult
        || isHonoContext(handlerResult)
        || handlerResult instanceof Response
    );
};
