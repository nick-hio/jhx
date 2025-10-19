import type { Response as ExpressResponse } from 'express';

import { isExpressResponse, isResponseSent } from './send-payload';

export const isResponseHandled = (response: ExpressResponse, handlerResult: any): boolean => {
    return isResponseSent(response) || handlerResult === response || isExpressResponse(handlerResult);
};
