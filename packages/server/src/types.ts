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
    /**
     * The default `Content-Type` header for the JHX handler responses.
     * Can be overridden in the handlers or `render` function.
     *
     * Defaults to `text/html; charset=utf-8`.
     */
    contentType?: string | null;

    /**
     * Whether to log additional route information to the console.
     *
     * Defaults to `false`.
     */
    debug?: boolean;

    /**
     * Handler invoked when an error occurs during JHX route handling.
     * The error is thrown if no handler is provided.
     */
    errorHandler?: TErrorHandler;

    /**
     * Middleware function(s) to be applied to the JHX routes.
     */
    middleware?: THandler | Array<THandler>;

    /**
     * Handler invoked when a JHX route is not found.
     *
     * Defaults to a 404 status response:
     * ```ts
     * async (req, res) => res.code(404).send()
     * ```
     */
    notFoundHandler?: THandler;

    /**
     * Callback function invoked when a JHX route is registered.
     */
    onRegistered?: JhxOnRegistered;

    /**
     * The prefix for the JHX routes.
     *
     * Defaults to `"/_jhx"`.
     */
    prefix?: string;

    /**
     * Whether to render the `errorHandler` responses.
     *
     * Defaults to `true`.
     */
    renderError?: boolean;

    /**
     * Whether to render the `middleware` responses.
     *
     * Defaults to `true`.
     */
    renderMiddleware?: boolean;

    /**
     * Whether to render the `notFoundHandler` responses.
     *
     * Defaults to `true`.
     */
    renderNotFound?: boolean;

    /**
     * Determines how the route payloads will be rendered.
     *
     * - `"static"`: Renders the handler response using `renderToStaticMarkup` (from `react/server`) when the payload is JSX.
     * - `"string"`: Renders the handler response using `renderToString` (from `react/server`) when the payload is JSX.
     * - `JhxRenderFunction`: Function for customizing the rendering/delivering behavior of the route handlers.
     *
     * Defaults to `static`.
     */
    render?: 'static' | 'string' | TRenderHandler | false;

    /**
     * Pre-configured JHX routes to be registered.
     */
    routes?: TPartialRoute | Array<TPartialRoute>;

    trailingSlash?: 'slash' | 'no-slash' | 'both';

    /**
     * Framework-specific options.
     * (e.g., Fastify `routeOptions` type, Elysia `ElysiaConfig` type)
     */
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
    render: TRenderHandler | null;
};

export type ServerJhxProps<
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = BaseJhxProps<TDom> & {
    /**
     * JHX handler function for the HTMX interaction.
     */
    handler?: THandler;
};

export type ServerJhxDomProps<
    TDom extends object,
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = BaseJhxDomProps<TDom> & {
    /**
     * JHX handler function for the HTMX interaction.
     *
     * When returning a Fastify response, ensure to call `.send()` to avoid hanging requests.
     */
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
