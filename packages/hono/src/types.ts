import type { ReactNode } from 'react';
import type { Context as HonoContext, ErrorHandler as HonoErrorHandler, TypedResponse } from 'hono';
import type { Stream } from 'node:stream';

import type {
    JhxServerError,
    ServerCreateJhxConfig,
    ServerJhxComponentProps,
    ServerJhxComponentType,
    ServerJhxDomProps,
    ServerJhxErrorHandler,
    ServerJhxHandler,
    ServerJhxPartialRoute,
    ServerJhxProps,
    ServerJhxRenderHandler,
    ServerJhxRoute,
    ServerResolved,
} from '@jhxdev/server';
import type { JhxConfig as BaseJhxConfig, JhxError } from 'jhx';

// Base Types

export type HonoError = Parameters<HonoErrorHandler>[0];

type RenderReturn =
    | ArrayBuffer
    | ArrayBufferView
    | Buffer
    | Blob
    | Record<string, unknown>
    | ReadableStream
    | Stream
    | Response
    | (Response & TypedResponse<any, any, any>)
    | string
    | number
    | boolean
    | null
    | void;
export type JhxRenderReturn = RenderReturn | Promise<RenderReturn>;

export type JhxHandlerReturn = JhxRenderReturn | ReactNode | Promise<ReactNode>;

export type JhxErrorType = Error | JhxError | JhxServerError | HonoError;

// Generic Types

export type Resolved<TReturn = JhxHandlerReturn> = ServerResolved<TReturn>;

export type JhxHandler<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxHandler<TReturn, TContext, undefined>;

export type JhxErrorHandler<
    TError extends JhxErrorType = JhxErrorType,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxErrorHandler<TError, TReturn, TContext, undefined>;

export type JhxRenderHandler<
    TResolved extends Resolved = Resolved,
    TReturn extends JhxRenderReturn = JhxRenderReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxRenderHandler<TResolved, TReturn, TContext, undefined>;

export type JhxRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxRoute<TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export type JhxPartialRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxPartialRoute<TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export type CreateJhxConfig<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRendered extends JhxRenderReturn = JhxRenderReturn,
    TError extends JhxErrorType = JhxErrorType,
    TContext extends HonoContext = HonoContext,
> = ServerCreateJhxConfig<
    TReturn,
    Resolved<TReturn>,
    TRendered,
    TError,
    TContext,
    undefined,
    JhxHandler<TReturn, TContext>,
    JhxErrorHandler<TError, TReturn, TContext>,
    JhxRenderHandler<Resolved<TReturn>, TRendered, TContext>,
    JhxPartialRoute<TReturn, TContext>
> & {};

export type JhxProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxProps<TDom, TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export type JhxDomProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxDomProps<TDom, TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export interface Jhx<
    TDomBase extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
    TBaseStringify extends boolean | undefined = undefined,
> {
    <TDom extends object | TDomBase = TDomBase>(
        options: JhxDomProps<TDom, TReturn, TContext>,
        config: BaseJhxConfig & { stringify: true },
    ): string;

    <TDom extends object | TDomBase = TDomBase>(
        options: JhxProps<TDom, TReturn, TContext>,
        config: BaseJhxConfig & { stringify: false },
    ): Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: TBaseStringify extends true
            ? JhxDomProps<TDom, TReturn, TContext>
            : JhxProps<TDom, TReturn, TContext>,
        config?: BaseJhxConfig,
    ): TBaseStringify extends true ? string : Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: JhxProps<TDom, TReturn, TContext> | JhxDomProps<TDom, TReturn, TContext>,
        config?: BaseJhxConfig,
    ): string | Record<string, string>;

    addRoute(newRoute: JhxPartialRoute<TReturn, TContext>): void;
    addRoutes(newRoutes: Array<JhxPartialRoute<TReturn, TContext>>): void;
    clearRoutes(): void;
    getRoute(method: string, path: string): JhxRoute<TReturn, TContext> | null;
    getRoutes(): Array<JhxRoute<TReturn, TContext>>;
    hasRoute(method: string, path: string): boolean;
    removeRoute(method: string, path: string): boolean;
}

export type JhxComponentProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxComponentProps<
    TDom,
    TReturn,
    TContext,
    undefined,
    JhxHandler<TReturn, TContext>,
    JhxProps<TDom, TReturn, TContext>
>;

export type JhxComponentType<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends HonoContext = HonoContext,
> = ServerJhxComponentType<
    TDom,
    TReturn,
    TContext,
    undefined,
    JhxHandler<TReturn, TContext>,
    JhxProps<TDom, TReturn, TContext>,
    JhxComponentProps<TDom, TReturn, TContext>
>;
