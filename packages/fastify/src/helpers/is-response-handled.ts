import Stream from 'node:stream';
import Readable from 'node:stream';
import type { FastifyReply } from 'fastify';

import { isFastifyReply, isReplySent } from './send-payload';

export const isResponseHandled = (res: FastifyReply, handlerResult: any): boolean => {
    return (
        isReplySent(res)
        || isFastifyReply(handlerResult)
        || handlerResult === res
        || handlerResult instanceof Response
        || handlerResult instanceof ReadableStream
        || handlerResult instanceof Readable
        || handlerResult instanceof Stream
    );
};
