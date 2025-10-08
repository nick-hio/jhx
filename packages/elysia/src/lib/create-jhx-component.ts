import type { Context as ElysiaContext } from 'elysia';

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
    TContext extends ElysiaContext = ElysiaContext,
>(
    jhx: Jhx<TDom, TReturn, TContext, any>,
) => {
    return baseCreateJhxComponent(
        jhx as ServerJhx<
            TDom,
            TReturn,
            TContext,
            undefined,
            any,
            JhxHandler<TReturn, TContext>,
            JhxRoute<TReturn, TContext>,
            JhxPartialRoute<TReturn, TContext>
        >,
    ) as JhxComponentType<TDom, TReturn, TContext>;
};
