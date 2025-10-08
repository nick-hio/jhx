import type { FastifyReply } from 'fastify';

const isFastifyReply = (value: any): value is FastifyReply => {
    return (
        value
        && typeof value === 'object'
        && typeof (value as any).send === 'function'
        && ('raw' in value || 'res' in value)
        && 'request' in value
        && 'sent' in value
    );
};

const isReplySent = (r: any) => {
    return !!(
        r
        && (r.sent || (r.raw && (r.raw.headersSent || r.raw.writableEnded)) || r.headersSent === true)
    );
};

export const isResponseHandled = (response: FastifyReply, handlerResult: any) =>
    isReplySent(response)
    || handlerResult === response
    || isFastifyReply(handlerResult)
    || handlerResult instanceof Response;
