import type { Context as HonoContext, Hono as HonoInstance } from 'hono';

import { createServerJhx, JhxServerException } from '@jhxdev/server';

import { isResponseHandled } from '../helpers/is-response-handled';
import { sendPayload } from '../helpers/send-payload';
import type {
    CreateJhxConfig,
    Jhx,
    JhxComponentProps,
    JhxComponentType,
    JhxErrorHandler,
    JhxErrorType,
    JhxHandler,
    JhxHandlerReturn,
    JhxPartialRoute,
    JhxProps,
    JhxRenderHandler,
    JhxRenderReturn,
    JhxRoute,
    Resolved,
} from '../types';
import { defaultConfig } from './default-config';

export const createJhx = <
    TDomBase extends object = object,
    TReturn extends JhxHandlerReturn = JhxHandlerReturn,
    TError extends JhxErrorType = JhxErrorType,
    TContext extends HonoContext = HonoContext,
    TBaseStringify extends boolean | undefined = undefined,
>(
    hono: HonoInstance,
    config: CreateJhxConfig<TReturn, JhxRenderReturn, TError, TContext> & {
        stringify?: TBaseStringify;
    } = {},
): {
    jhx: Jhx<TDomBase, TReturn, TContext, TBaseStringify>;
    JhxComponent: JhxComponentType<TDomBase, TReturn, TContext>;
} => {
    return createServerJhx<
        TDomBase,
        TReturn,
        Resolved<TReturn>,
        JhxRenderReturn,
        TError,
        TContext,
        undefined,
        TBaseStringify,
        JhxHandler<TReturn, TContext>,
        JhxErrorHandler<TError, TReturn, TContext>,
        JhxRenderHandler<Resolved<TReturn>, JhxRenderReturn, TContext>,
        JhxProps<TDomBase, TReturn, TContext>,
        JhxComponentProps<TDomBase, TReturn, TContext>,
        JhxRoute<TReturn, TContext>,
        JhxPartialRoute<TReturn, TContext>
    >(config, defaultConfig.notFoundHandler, (baseConfig, routes) => {
        hono.all(`${baseConfig.prefix}/*`, async (context) => {
            const method = context.req.method;
            const route = decodeURIComponent(context.req.path);
            const jhxHandler = routes.get(`${method}::${route}`);

            if (baseConfig.contentType) {
                context.header('content-type', baseConfig.contentType);
            }

            if (jhxHandler) {
                // middleware
                for (const middleware of baseConfig.middleware) {
                    try {
                        const mwResult = await middleware(context as TContext);
                        if (isResponseHandled(context, mwResult)) {
                            return sendPayload(context, mwResult);
                        }
                        if (mwResult !== undefined) {
                            const renderResult =
                                baseConfig.render && baseConfig.renderMiddleware
                                    ? await baseConfig.render(mwResult, context as TContext)
                                    : mwResult;
                            return sendPayload(context, renderResult);
                        }
                    } catch (e) {
                        const error = e as TError;

                        if (baseConfig.debug) {
                            baseConfig.logger.error(
                                `[jhx] Middleware error from '${method} ${route}': ${error.message}`,
                            );
                        }
                        if (baseConfig.errorHandler) {
                            context.status(500);
                            const errorResult = await baseConfig.errorHandler(error, context as TContext);
                            if (isResponseHandled(context, errorResult)) {
                                return sendPayload(context, errorResult, 500);
                            }

                            const renderResult =
                                baseConfig.render && baseConfig.renderError
                                    ? await baseConfig.render(errorResult, context as TContext)
                                    : errorResult;
                            return sendPayload(context, renderResult, 500);
                        }

                        throw new JhxServerException('Unhandled middleware error', {
                            type: 'middleware:error',
                            method,
                            route,
                            cause: error,
                        });
                    }
                }

                // route
                try {
                    const routeResult = await jhxHandler(context as TContext);
                    if (isResponseHandled(context, routeResult)) {
                        return sendPayload(context, routeResult);
                    }

                    const renderResult = baseConfig.render
                        ? await baseConfig.render(routeResult, context as TContext)
                        : routeResult;
                    return sendPayload(context, renderResult);
                } catch (e) {
                    const error = e as TError;

                    if (baseConfig.debug) {
                        baseConfig.logger.error(
                            `[jhx] Route error from '${method} ${route}': ${error.message}`,
                        );
                    }
                    if (baseConfig.errorHandler) {
                        context.status(500);
                        const errorResult = await baseConfig.errorHandler(error, context as TContext);
                        if (isResponseHandled(context, errorResult)) {
                            return sendPayload(context, errorResult, 500);
                        }

                        const renderResult =
                            baseConfig.render && baseConfig.renderError
                                ? await baseConfig.render(errorResult, context as TContext)
                                : errorResult;
                        return sendPayload(context, renderResult, 500);
                    }

                    throw new JhxServerException('[jhx] Unhandled endpoint or rendering error', {
                        type: 'handler:error',
                        method,
                        route,
                        cause: error,
                    });
                }
            }

            if (baseConfig.debug) {
                baseConfig.logger.info(`[jhx] Request to unknown route '${method} ${route}'`);
            }

            context.status(404);
            const notFoundResult = await baseConfig.notFoundHandler(context as TContext);
            if (isResponseHandled(context, notFoundResult)) {
                return sendPayload(context, notFoundResult, 404);
            }

            const renderResult =
                baseConfig.render && baseConfig.renderNotFound
                    ? await baseConfig.render(notFoundResult, context as TContext)
                    : notFoundResult;
            return sendPayload(context, renderResult, 404);
        });
    }) as {
        jhx: Jhx<TDomBase, TReturn, TContext, TBaseStringify>;
        JhxComponent: JhxComponentType<TDomBase, TReturn, TContext>;
    };
};
