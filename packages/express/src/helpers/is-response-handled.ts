import type { Response as ExpressResponse } from 'express';

const isExpressResponse = (value: any): value is ExpressResponse => {
    return (
        value !== null
        && typeof value === 'object'
        && typeof value.send === 'function'
        && typeof value.status === 'function'
        && typeof value.json === 'function'
        && 'headersSent' in value
    );
};

const isResponseSent = (r: any) => {
    return !!(r && (r.headersSent === true || r.finished === true || r.writableEnded === true));
};

export const isResponseHandled = (response: ExpressResponse, handlerResult: any) =>
    isResponseSent(response) || handlerResult === response || isExpressResponse(handlerResult);
