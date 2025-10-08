import type { Context as HonoContext } from 'hono';

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

export function createJhxComponent<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
>(jhx: Jhx<TDom, TReturn, TContext, any>) {
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
}
