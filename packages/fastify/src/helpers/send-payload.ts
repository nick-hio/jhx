import type { FastifyReply } from 'fastify';

import { isResponseHandled } from './is-response-handled';

export const sendPayload = (res: FastifyReply, payload: any) => {
    if (isResponseHandled(res, payload)) {
        return res;
    }
    return res.send(payload);
};
