import type { FastifyReply } from 'fastify';

import { isFastifyReply, isReplySent } from './send-payload';

export const isResponseHandled = (res: FastifyReply, handlerResult: any): boolean => {
    return isReplySent(res) || handlerResult === res || isFastifyReply(handlerResult);
};
