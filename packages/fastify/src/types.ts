import type { ElementType, ReactNode } from 'react';
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import type { RouteShorthandOptions } from 'fastify/types/route';

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

declare module 'fastify' {
    export interface FastifyInstance {
        jhx: Jhx;
        JhxComponent: JhxComponentType;
    }
}

// Base Types

type RenderReturn =
    | ArrayBufferView
    | ArrayBuffer
    | Buffer
    | Blob
    | FastifyReply
    | Record<string, any>
    | string
    | number
    | boolean
    | null
    | void;
export type JhxRenderReturn = RenderReturn | Promise<RenderReturn>;

export type JhxHandlerReturn = JhxRenderReturn | ReactNode | Promise<ReactNode>;

export type JhxErrorType = Error | JhxError | JhxServerError | FastifyError;

// Generic Types

export type Resolved<TReturn = JhxHandlerReturn> = ServerResolved<TReturn>;

export type JhxHandler<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxHandler<TReturn, TRequest, TReply>;

export type JhxErrorHandler<
    TError extends JhxErrorType = JhxErrorType,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxErrorHandler<TError, TReturn, TRequest, TReply>;

export type JhxRenderHandler<
    TResolved extends Resolved = Resolved,
    TReturn extends JhxRenderReturn = JhxRenderReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxRenderHandler<TResolved, TReturn, TRequest, TReply>;

export type JhxRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxRoute<TReturn, TRequest, TReply, JhxHandler<TReturn, TRequest, TReply>>;

export type JhxPartialRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxPartialRoute<TReturn, TRequest, TReply, JhxHandler<TReturn, TRequest, TReply>>;

export type CreateJhxConfig<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRendered extends JhxRenderReturn = JhxRenderReturn,
    TError extends JhxErrorType = JhxErrorType,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerCreateJhxConfig<
    TReturn,
    Resolved<TReturn>,
    TRendered,
    TError,
    TRequest,
    TReply,
    JhxHandler<TReturn, TRequest, TReply>,
    JhxErrorHandler<TError, TReturn, TRequest, TReply>,
    JhxRenderHandler<Resolved<TReturn>, TRendered, TRequest, TReply>,
    JhxPartialRoute<TReturn, TRequest, TReply>,
    RouteShorthandOptions
> & {};

export type JhxProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxProps<TDom, TReturn, TRequest, TReply, JhxHandler<TReturn, TRequest, TReply>>;

export type JhxDomProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxDomProps<TDom, TReturn, TRequest, TReply, JhxHandler<TReturn, TRequest, TReply>>;

export interface Jhx<
    TDomBase extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
    TBaseStringify extends boolean | undefined = undefined,
> {
    <TDom extends object | TDomBase = TDomBase>(
        options: JhxDomProps<TDom, TReturn, TRequest, TReply>,
        config: BaseJhxConfig & { stringify: true },
    ): string;

    <TDom extends object | TDomBase = TDomBase>(
        options: JhxProps<TDom, TReturn, TRequest, TReply>,
        config: BaseJhxConfig & { stringify: false },
    ): Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: TBaseStringify extends true
            ? JhxDomProps<TDom, TReturn, TRequest, TReply>
            : JhxProps<TDom, TReturn, TRequest, TReply>,
        config?: BaseJhxConfig,
    ): TBaseStringify extends true ? string : Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: JhxProps<TDom, TReturn, TRequest, TReply> | JhxDomProps<TDom, TReturn, TRequest, TReply>,
        config?: BaseJhxConfig,
    ): string | Record<string, string>;

    addRoute(newRoute: JhxPartialRoute<TReturn, TRequest, TReply>): void;
    addRoutes(newRoutes: Array<JhxPartialRoute<TReturn, TRequest, TReply>>): void;
    clearRoutes(): void;
    getRoute(method: string, path: string): JhxRoute<TReturn, TRequest, TReply> | null;
    getRoutes(): Array<JhxRoute<TReturn, TRequest, TReply>>;
    hasRoute(method: string, path: string): boolean;
    removeRoute(method: string, path: string): boolean;
}

export type JhxComponentProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
    TTag extends ElementType = 'div',
> = ServerJhxComponentProps<TDom, TReturn, TRequest, TReply, JhxHandler<TReturn, TRequest, TReply>, TTag>;

export type JhxComponentType<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
> = ServerJhxComponentType<TDom, TReturn, TRequest, TReply, JhxHandler<TReturn, TRequest, TReply>>;
