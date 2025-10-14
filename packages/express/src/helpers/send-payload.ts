import type { Response as ExpressResponse } from 'express';

import { isResponseHandled } from './is-response-handled';

export const sendPayload = (res: ExpressResponse, payload: any) => {
    if (isResponseHandled(res, payload)) {
        return;
    }
    res.status(res.statusCode).send(payload);
};
