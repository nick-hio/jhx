import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

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
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
>(
    jhx: Jhx<TDom, TReturn, TRequest, TResponse, any>,
) => {
    return baseCreateJhxComponent(
        jhx as ServerJhx<
            TDom,
            TReturn,
            TRequest,
            TResponse,
            any,
            JhxHandler<TReturn, TRequest, TResponse>,
            JhxRoute<TReturn, TRequest, TResponse>,
            JhxPartialRoute<TReturn, TRequest, TResponse>
        >,
    ) as JhxComponentType<TDom, TReturn, TRequest, TResponse>;
};
