import type { Context as ElysiaContext, Elysia as ElysiaInstance } from 'elysia';
import type { ElysiaConfig } from 'elysia/types';

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
    TContext extends ElysiaContext = ElysiaContext,
    TBaseStringify extends boolean | undefined = undefined,
>(
    elysia: ElysiaInstance,
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
        JhxPartialRoute<TReturn, TContext>,
        ElysiaConfig<string>
    >(config, defaultConfig.notFoundHandler, (baseConfig, routes) => {
        elysia.all(`${baseConfig.prefix}/*`, async (context: ElysiaContext) => {
            const method = context.request.method;
            const route = decodeURIComponent(context.path);
            const jhxRoute = routes.get(`${method}::${route}`);

            if (baseConfig.contentType) {
                context.set.headers['content-type'] = baseConfig.contentType;
            }

            if (jhxRoute) {
                // middleware
                for (const middleware of baseConfig.middleware) {
                    try {
                        const mwResult = await middleware(context as TContext);
                        if (isResponseHandled(context)) {
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
                            context.set.status = 500;
                            const errorResult = await baseConfig.errorHandler(error, context as TContext);
                            if (isResponseHandled(context)) {
                                return sendPayload(context, errorResult);
                            }

                            const renderResult =
                                baseConfig.render && baseConfig.renderError
                                    ? await baseConfig.render(errorResult, context as TContext)
                                    : errorResult;
                            return sendPayload(context, renderResult);
                        }

                        throw new JhxServerException('Unexpected jhx middleware error', {
                            type: 'middleware:error',
                            info: 'Unhandled error while handling middleware or rendering middleware payload',
                            method,
                            route,
                            cause: error,
                        });
                    }
                }

                // route
                try {
                    const routeResult = await jhxRoute(context as TContext);
                    if (isResponseHandled(context)) {
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
                        context.set.status = 500;
                        const errorResult = await baseConfig.errorHandler(error, context as TContext);
                        if (isResponseHandled(context)) {
                            return sendPayload(context, errorResult);
                        }

                        const renderResult =
                            baseConfig.render && baseConfig.renderError
                                ? await baseConfig.render(errorResult, context as TContext)
                                : errorResult;
                        return sendPayload(context, renderResult);
                    }

                    throw new JhxServerException('Unexpected jhx route error', {
                        type: 'handler:error',
                        info: 'Unhandled error while handling route or rendering route payload',
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
            context.set.status = 404;
            const notFoundResult = await baseConfig.notFoundHandler(context as TContext);
            if (isResponseHandled(context)) {
                return sendPayload(context, notFoundResult);
            }

            const renderResult =
                baseConfig.render && baseConfig.renderNotFound
                    ? await baseConfig.render(notFoundResult, context as TContext)
                    : notFoundResult;
            return sendPayload(context, renderResult);
        });
    }) as {
        jhx: Jhx<TDomBase, TReturn, TContext, TBaseStringify>;
        JhxComponent: JhxComponentType<TDomBase, TReturn, TContext>;
    };
};
