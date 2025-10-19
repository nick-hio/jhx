import type { Context as HonoContext } from 'hono';

const isResponseSent = (context: any) => {
    return context?.finalized === true;
};

export const isResponseHandled = (context: HonoContext) => {
    return isResponseSent(context);
};
