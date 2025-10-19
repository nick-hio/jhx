import type { Stream } from 'node:stream';
import type { ReactNode } from 'react';
import type {
    Context as ElysiaContext,
    ElysiaCustomStatusResponse,
    ElysiaFile,
    form as elysiaForm,
    InternalServerError,
    NotFoundError,
    ParseError,
    ValidationError,
} from 'elysia';
import type { ElysiaConfig } from 'elysia/types';

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

export type ElysiaError = ValidationError | ParseError | NotFoundError | InternalServerError;
export type ElysiaFormData = ReturnType<typeof elysiaForm>;

type RenderReturn =
    | ArrayBuffer
    | ArrayBufferView
    | Buffer
    | Blob
    | ElysiaCustomStatusResponse<any, any, any>
    | ElysiaFile
    | ElysiaFormData
    | Record<string, unknown>
    | ReadableStream
    | Stream
    | Response
    | string
    | number
    | boolean
    | null
    | void;
export type JhxRenderReturn = RenderReturn | Promise<RenderReturn>;

export type JhxHandlerReturn = JhxRenderReturn | ReactNode | Promise<ReactNode>;

export type JhxErrorType = Error | JhxError | JhxServerError | ElysiaError;

// Generic Types

export type Resolved<TReturn = JhxHandlerReturn> = ServerResolved<TReturn>;

export type JhxHandler<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxHandler<TReturn, TContext, undefined>;

export type JhxErrorHandler<
    TError extends JhxErrorType = JhxErrorType,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxErrorHandler<TError, TReturn, TContext, undefined>;

export type JhxRenderHandler<
    TResolved extends Resolved = Resolved,
    TReturn extends JhxRenderReturn = JhxRenderReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxRenderHandler<TResolved, TReturn, TContext, undefined>;

export type JhxRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxRoute<TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export type JhxPartialRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxPartialRoute<TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export type CreateJhxConfig<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRendered extends JhxRenderReturn = JhxRenderReturn,
    TError extends JhxErrorType = JhxErrorType,
    TContext extends ElysiaContext = ElysiaContext,
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
    JhxPartialRoute<TReturn, TContext>,
    ElysiaConfig<any>
> & {};

export type JhxProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxProps<TDom, TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export type JhxDomProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxDomProps<TDom, TReturn, TContext, undefined, JhxHandler<TReturn, TContext>>;

export interface Jhx<
    TDomBase extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TContext extends ElysiaContext = ElysiaContext,
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
    TContext extends ElysiaContext = ElysiaContext,
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
    TContext extends ElysiaContext = ElysiaContext,
> = ServerJhxComponentType<
    TDom,
    TReturn,
    TContext,
    undefined,
    JhxHandler<TReturn, TContext>,
    JhxProps<TDom, TReturn, TContext>,
    JhxComponentProps<TDom, TReturn, TContext>
>;
