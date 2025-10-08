import type { FastifyReply, FastifyRequest } from 'fastify';

import { createJhxComponent as baseCreateJhxComponent } from '@jhxdev/server';
import type { ServerJhx } from '@jhxdev/server';

import type {
    Jhx,
    JhxComponentType,
    JhxHandler,
    JhxHandlerReturn,
    JhxPartialRoute,
    JhxRoute,
} from '../types';

export const createJhxComponent = <
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
>(
    jhx: Jhx<TDom, TReturn, TRequest, TReply, any>,
) => {
    return baseCreateJhxComponent(
        jhx as ServerJhx<
            TDom,
            TReturn,
            TRequest,
            TReply,
            any,
            JhxHandler<TReturn, TRequest, TReply>,
            JhxRoute<TReturn, TRequest, TReply>,
            JhxPartialRoute<TReturn, TRequest, TReply>
        >,
    ) as JhxComponentType<TDom, TReturn, TRequest, TReply>;
};
