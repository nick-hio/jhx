import type {
    Express as ExpressInstance,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';

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
    TRequest extends ExpressRequest = ExpressRequest,
    TResponse extends ExpressResponse = ExpressResponse,
    TBaseStringify extends boolean | undefined = undefined,
>(
    express: ExpressInstance,
    config: CreateJhxConfig<TReturn, JhxRenderReturn, TError, TRequest, TResponse> & {
        stringify?: TBaseStringify;
    } = {},
): {
    jhx: Jhx<TDomBase, TReturn, TRequest, TResponse, TBaseStringify>;
    JhxComponent: JhxComponentType<TDomBase, TReturn, TRequest, TResponse>;
} => {
    return createServerJhx<
        TDomBase,
        TReturn,
        Resolved<TReturn>,
        JhxRenderReturn,
        TError,
        TRequest,
        TResponse,
        TBaseStringify,
        JhxHandler<TReturn, TRequest, TResponse>,
        JhxErrorHandler<TError, TReturn, TRequest, TResponse>,
        JhxRenderHandler<Resolved<TReturn>, JhxRenderReturn, TRequest, TResponse>,
        JhxProps<TDomBase, TReturn, TRequest, TResponse>,
        JhxComponentProps<TDomBase, TReturn, TRequest, TResponse>,
        JhxRoute<TReturn, TRequest, TResponse>,
        JhxPartialRoute<TReturn, TRequest, TResponse>
    >(config, defaultConfig.notFoundHandler, (baseConfig, routes) => {
        express.all(`${baseConfig.prefix}{*splat}`, async (req, res, _next) => {
            const method = req.method.toUpperCase();
            const route = decodeURIComponent(req.url.split('?')[0] as string);
            const jhxHandler = routes.get(`${method}::${route}`);

            if (baseConfig.contentType !== null) {
                res.header('content-type', baseConfig.contentType);
            }

            if (jhxHandler) {
                // middleware
                for (const middleware of baseConfig.middleware) {
                    try {
                        const middlewareResult = await middleware(req as TRequest, res as TResponse);
                        if (isResponseHandled(res, middlewareResult)) {
                            return await sendPayload(res, middlewareResult);
                        }

                        if (middlewareResult !== undefined) {
                            const renderResult =
                                baseConfig.render && baseConfig.renderMiddleware
                                    ? await baseConfig.render(
                                          middlewareResult,
                                          req as TRequest,
                                          res as TResponse,
                                      )
                                    : middlewareResult;
                            return await sendPayload(res, renderResult);
                        }
                    } catch (e) {
                        const error = e as TError;

                        if (baseConfig.debug) {
                            baseConfig.logger.error(
                                `[jhx] Middleware error from '${method} ${route}': ${(e as Error).message}`,
                            );
                        }
                        if (baseConfig.errorHandler) {
                            res.status(500);
                            const errorResult = await baseConfig.errorHandler(
                                error,
                                req as TRequest,
                                res as TResponse,
                            );
                            if (isResponseHandled(res, errorResult)) {
                                return await sendPayload(res, errorResult);
                            }

                            const renderResult =
                                baseConfig.render && baseConfig.renderError
                                    ? await baseConfig.render(errorResult, req as TRequest, res as TResponse)
                                    : errorResult;
                            return await sendPayload(res, renderResult);
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
                    const routeResult = await jhxHandler(req as TRequest, res as TResponse);
                    if (isResponseHandled(res, routeResult)) {
                        return await sendPayload(res, routeResult);
                    }

                    const renderResult = baseConfig.render
                        ? await baseConfig.render(routeResult, req as TRequest, res as TResponse)
                        : routeResult;
                    return await sendPayload(res, renderResult);
                } catch (e) {
                    const error = e as TError;

                    if (baseConfig.debug) {
                        baseConfig.logger.error(
                            `[jhx] Route error from '${method} ${route}': ${(e as Error).message}`,
                        );
                    }
                    if (baseConfig.errorHandler) {
                        res.status(500);
                        const errorResult = await baseConfig.errorHandler(
                            error,
                            req as TRequest,
                            res as TResponse,
                        );
                        if (isResponseHandled(res, errorResult)) {
                            return await sendPayload(res, errorResult);
                        }

                        const renderResult =
                            baseConfig.render && baseConfig.renderError
                                ? await baseConfig.render(errorResult, req as TRequest, res as TResponse)
                                : errorResult;
                        return await sendPayload(res, renderResult);
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
                baseConfig.logger.info(
                    `[jhx] Request to unknown route '${method} ${route}' from IP address '${req.ip}'`,
                );
            }

            res.status(404);
            const notFoundResult = await baseConfig.notFoundHandler(req as TRequest, res as TResponse);
            if (isResponseHandled(res, notFoundResult)) {
                return;
            }

            const renderResult =
                baseConfig.render && baseConfig.renderNotFound
                    ? await baseConfig.render(notFoundResult, req as TRequest, res as TResponse)
                    : notFoundResult;
            return await sendPayload(res, renderResult);
        });
    }) as {
        jhx: Jhx<TDomBase, TReturn, TRequest, TResponse, TBaseStringify>;
        JhxComponent: JhxComponentType<TDomBase, TReturn, TRequest, TResponse>;
    };
};
