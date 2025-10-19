import type { Context as ElysiaContext } from 'elysia';

const isResponseSent = (context: any) => {
    return (
        !!(context.responseValue || context.response)
        || typeof context.set?.redirect === 'string'
        || !!context.set?.stream
        || !!context.streamWriter
        || !!context._streaming
    );
};

export const isResponseHandled = (context: ElysiaContext): boolean => {
    return isResponseSent(context);
};
