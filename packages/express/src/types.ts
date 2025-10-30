import type { ElementType, ReactNode } from 'react';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

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

type RenderReturn =
    | ArrayBufferView
    | ArrayBuffer
    | Buffer
    | Blob
    | ExpressResponse
    | Record<string, any>
    | string
    | number
    | boolean
    | null
    | void;
export type JhxRenderReturn = RenderReturn | Promise<RenderReturn>;

export type JhxHandlerReturn = JhxRenderReturn | ReactNode | Promise<ReactNode>;

export type JhxErrorType = Error | JhxError | JhxServerError;

// Generic Types

export type Resolved<TReturn = JhxHandlerReturn> = ServerResolved<TReturn>;

export type JhxHandler<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxHandler<TReturn, TRequest, TResponse>;

export type JhxErrorHandler<
    TError extends JhxErrorType = JhxErrorType,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxErrorHandler<TError, TReturn, TRequest, TResponse>;

export type JhxRenderHandler<
    TResolved extends Resolved = Resolved,
    TReturn extends JhxRenderReturn = JhxRenderReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxRenderHandler<TResolved, TReturn, TRequest, TResponse>;

export type JhxRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxRoute<TReturn, TRequest, TResponse, JhxHandler<TReturn, TRequest, TResponse>>;

export type JhxPartialRoute<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxPartialRoute<TReturn, TRequest, TResponse, JhxHandler<TReturn, TRequest, TResponse>>;

export type CreateJhxConfig<
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRendered extends JhxRenderReturn = JhxRenderReturn,
    TError extends JhxErrorType = JhxErrorType,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerCreateJhxConfig<
    TReturn,
    Resolved<TReturn>,
    TRendered,
    TError,
    TRequest,
    TResponse,
    JhxHandler<TReturn, TRequest, TResponse>,
    JhxErrorHandler<TError, TReturn, TRequest, TResponse>,
    JhxRenderHandler<Resolved<TReturn>, TRendered, TRequest, TResponse>,
    JhxPartialRoute<TReturn, TRequest, TResponse>
> & {};

export type JhxProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxProps<TDom, TReturn, TRequest, TResponse, JhxHandler<TReturn, TRequest, TResponse>>;

export type JhxDomProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxDomProps<TDom, TReturn, TRequest, TResponse, JhxHandler<TReturn, TRequest, TResponse>>;

export interface Jhx<
    TDomBase extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
    TBaseStringify extends boolean | undefined = undefined,
> {
    <TDom extends object | TDomBase = TDomBase>(
        options: JhxDomProps<TDom, TReturn, TRequest, TResponse>,
        config: BaseJhxConfig & { stringify: true },
    ): string;

    <TDom extends object | TDomBase = TDomBase>(
        options: JhxProps<TDom, TReturn, TRequest, TResponse>,
        config: BaseJhxConfig & { stringify: false },
    ): Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: TBaseStringify extends true
            ? JhxDomProps<TDom, TReturn, TRequest, TResponse>
            : JhxProps<TDom, TReturn, TRequest, TResponse>,
        config?: BaseJhxConfig,
    ): TBaseStringify extends true ? string : Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options:
            | JhxProps<TDom, TReturn, TRequest, TResponse>
            | JhxDomProps<TDom, TReturn, TRequest, TResponse>,
        config?: BaseJhxConfig,
    ): string | Record<string, string>;

    addRoute(newRoute: JhxPartialRoute<TReturn, TRequest, TResponse>): void;
    addRoutes(newRoutes: Array<JhxPartialRoute<TReturn, TRequest, TResponse>>): void;
    clearRoutes(): void;
    getRoute(method: string, path: string): JhxRoute<TReturn, TRequest, TResponse> | null;
    getRoutes(): Array<JhxRoute<TReturn, TRequest, TResponse>>;
    hasRoute(method: string, path: string): boolean;
    removeRoute(method: string, path: string): boolean;
}

export type JhxComponentProps<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
    TTag extends ElementType = 'div',
> = ServerJhxComponentProps<
    TDom,
    TReturn,
    TRequest,
    TResponse,
    JhxHandler<TReturn, TRequest, TResponse>,
    TTag
>;

export type JhxComponentType<
    TDom extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
> = ServerJhxComponentType<TDom, TReturn, TRequest, TResponse, JhxHandler<TReturn, TRequest, TResponse>>;
