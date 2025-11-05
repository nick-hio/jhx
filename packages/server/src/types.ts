import type {
    JhxDomProps as BaseJhxDomProps,
    JhxProps as BaseJhxProps,
    JhxAttribute,
    JhxConfig,
    JhxError,
} from 'jhx';

import type { JhxServerError } from './lib/jhx-server-error';

// Shared Types

export type HttpMethodUpperCase =
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'OPTIONS'
    | 'PROPFIND'
    | 'PROPPATCH'
    | 'MKCOL'
    | 'COPY'
    | 'MOVE'
    | 'LOCK'
    | 'UNLOCK'
    | 'TRACE'
    | 'SEARCH'
    | 'REPORT'
    | 'MKCALENDAR'
    | (Uppercase<string> & {});
export type HttpMethodLowerCase = Lowercase<HttpMethodUpperCase> | (Lowercase<string> & {});
export type HttpMethod = HttpMethodUpperCase | HttpMethodLowerCase;

export type JhxOnRegistered = (method: string, route: string) => void;

export type JhxErrorType = Error | JhxError | JhxServerError;

// Extendable Types

export type ServerResolved<T> = Awaited<T>;

export type ServerJhxHandler<TReturn, TReq, TRes> = TRes extends undefined
    ? (context: TReq, _?: TRes) => TReturn
    : (req: TReq, res: TRes) => TReturn;

export type ServerJhxErrorHandler<TError extends JhxErrorType, TReturn, TReq, TRes> = TRes extends undefined
    ? (error: TError, context: TReq, _?: TRes) => TReturn
    : (error: TError, req: TReq, res: TRes) => TReturn;

export type ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes> = TRes extends undefined
    ? (payload: TResolved, context: TReq, _?: TRes) => TRendered
    : (payload: TResolved, request: TReq, response: TRes) => TRendered;

export type ServerJhxRoute<TReturn, TReq, TRes, THandler extends ServerJhxHandler<TReturn, TReq, TRes>> = {
    method: HttpMethodUpperCase;
    route: string;
    handler: THandler;
};

export type ServerJhxPartialRoute<
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = {
    method?: HttpMethod;
    route: string;
    handler: THandler;
};

export type ServerCreateJhxConfig<
    TReturn,
    TResolved,
    TRendered,
    TError extends JhxErrorType,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TErrorHandler extends ServerJhxErrorHandler<TError, TReturn, TReq, TRes>,
    TRenderHandler extends ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
    TInstanceOptions = undefined,
> = JhxConfig & {
    contentType?: string | false;
    debug?: boolean;
    errorHandler?: TErrorHandler;
    middleware?: THandler | Array<THandler>;
    notFoundHandler?: THandler;
    onRegistered?: JhxOnRegistered;
    prefix?: string;
    renderError?: boolean;
    renderMiddleware?: boolean;
    renderNotFound?: boolean;
    render?: 'static' | 'string' | TRenderHandler | false;
    routes?: TPartialRoute | Array<TPartialRoute>;
    trailingSlash?: 'slash' | 'no-slash' | 'both';
    instanceOptions?: TInstanceOptions;
};

export type NormalizedServerJhxConfig<
    TReturn,
    TResolved,
    TRendered,
    TError extends JhxErrorType,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TErrorHandler extends ServerJhxErrorHandler<TError, TReturn, TReq, TRes>,
    TRenderHandler extends ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
    TInstanceOptions = undefined,
> = Required<
    Omit<
        ServerCreateJhxConfig<
            TReturn,
            TResolved,
            TRendered,
            TError,
            TReq,
            TRes,
            THandler,
            TErrorHandler,
            TRenderHandler,
            TPartialRoute,
            TInstanceOptions
        >,
        'routes' | 'errorHandler' | 'middleware' | 'notFoundHandler' | 'render'
    >
> & {
    errorHandler: TErrorHandler | undefined;
    middleware: Array<THandler>;
    notFoundHandler: THandler;
    render: TRenderHandler | false;
};

export type ServerJhxProps<
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = BaseJhxProps<TDom> & {
    handler?: THandler;
};

export type ServerJhxDomProps<
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = BaseJhxDomProps<TDom> & {
    handler?: THandler;
};

export interface ServerJhx<
    TDomBase extends object,
    TReturn,
    TReq,
    TRes,
    TBaseStringify extends boolean | undefined,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
> {
    <TDom extends object | TDomBase = TDomBase>(
        options: ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>,
        config: Omit<JhxConfig, 'stringify'> & { stringify: true },
    ): string;

    <TDom extends object | TDomBase = TDomBase>(
        options: ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
        config: Omit<JhxConfig, 'stringify'> & { stringify: false },
    ): Record<JhxAttribute, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: TBaseStringify extends true
            ? ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>
            : ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
        config?: JhxConfig,
    ): TBaseStringify extends true ? string : Record<JhxAttribute, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options:
            | ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>
            | ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>,
        config?: JhxConfig,
    ): string | Record<JhxAttribute, string>;

    addRoute(newRoute: TPartialRoute): void;
    addRoutes(newRoutes: Array<TPartialRoute>): void;
    clearRoutes(): void;
    getRoute(method: string, path: string): TRoute | null;
    getRoutes(): Array<TRoute>;
    hasRoute(method: string, path: string): boolean;
    removeRoute(method: string, path: string): boolean;
}
