import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { RouteShorthandOptions } from 'fastify/types/route';

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
    TRequest extends FastifyRequest = FastifyRequest,
    TReply extends FastifyReply = FastifyReply,
    TBaseStringify extends boolean | undefined = undefined,
>(
    fastify: FastifyInstance,
    config: CreateJhxConfig<TReturn, JhxRenderReturn, TError, TRequest, TReply> & {
        stringify?: TBaseStringify;
    } = {},
): {
    jhx: Jhx<TDomBase, TReturn, TRequest, TReply, TBaseStringify>;
    JhxComponent: JhxComponentType<TDomBase, TReturn, TRequest, TReply>;
} => {
    return createServerJhx<
        TDomBase,
        TReturn,
        Resolved<TReturn>,
        JhxRenderReturn,
        TError,
        TRequest,
        TReply,
        TBaseStringify,
        JhxHandler<TReturn, TRequest, TReply>,
        JhxErrorHandler<TError, TReturn, TRequest, TReply>,
        JhxRenderHandler<Resolved<TReturn>, JhxRenderReturn, TRequest, TReply>,
        JhxProps<TDomBase, TReturn, TRequest, TReply>,
        JhxComponentProps<TDomBase, TReturn, TRequest, TReply>,
        JhxRoute<TReturn, TRequest, TReply>,
        JhxPartialRoute<TReturn, TRequest, TReply>,
        RouteShorthandOptions
    >(config, defaultConfig.notFoundHandler, (baseConfig, routes) => {
        fastify.all(`${baseConfig.prefix}/*`, config.instanceOptions ?? {}, async (req, res) => {
            const method = req.method.toUpperCase();
            const route = decodeURIComponent(req.url.split('?')[0] as string);
            const jhxRoute = routes.get(`${method}::${route}`);

            if (baseConfig.contentType) {
                res.header('Content-Type', baseConfig.contentType);
            }

            if (jhxRoute) {
                // middleware
                for (const middleware of baseConfig.middleware) {
                    try {
                        const mwResult = await middleware(req as TRequest, res as TReply);
                        if (isResponseHandled(res, mwResult)) {
                            return await sendPayload(res, mwResult);
                        }

                        if (mwResult !== undefined) {
                            const renderResult =
                                baseConfig.render && baseConfig.renderMiddleware
                                    ? await baseConfig.render(mwResult, req as TRequest, res as TReply)
                                    : mwResult;
                            return await sendPayload(res, renderResult);
                        }
                    } catch (e) {
                        const error = e as TError;

                        if (baseConfig.debug) {
                            baseConfig.logger.error(
                                `[jhx] Middleware error from '${req.method} ${route}': ${(e as Error).message}`,
                            );
                        }
                        if (baseConfig.errorHandler) {
                            res.status(500);
                            const errorResult = await baseConfig.errorHandler(
                                error,
                                req as TRequest,
                                res as TReply,
                            );
                            if (isResponseHandled(res, errorResult)) {
                                return await sendPayload(res, errorResult);
                            }

                            const renderResult =
                                baseConfig.render && baseConfig.renderError
                                    ? await baseConfig.render(errorResult, req as TRequest, res as TReply)
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
                    const routeResult = await jhxRoute(req as TRequest, res as TReply);
                    if (isResponseHandled(res, routeResult)) {
                        return await sendPayload(res, routeResult);
                    }

                    const renderResult = baseConfig.render
                        ? await baseConfig.render(routeResult, req as TRequest, res as TReply)
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
                            res as TReply,
                        );
                        if (isResponseHandled(res, errorResult)) {
                            return await sendPayload(res, errorResult);
                        }

                        const renderResult =
                            baseConfig.render && baseConfig.renderError
                                ? await baseConfig.render(errorResult, req as TRequest, res as TReply)
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
            const notFoundResult = await baseConfig.notFoundHandler(req as TRequest, res as TReply);
            if (isResponseHandled(res, notFoundResult)) {
                return await sendPayload(res, notFoundResult);
            }

            const renderResult =
                baseConfig.render && baseConfig.renderNotFound
                    ? await baseConfig.render(notFoundResult, req as TRequest, res as TReply)
                    : notFoundResult;
            return await sendPayload(res, renderResult);
        });
    }) as {
        jhx: Jhx<TDomBase, TReturn, TRequest, TReply, TBaseStringify>;
        JhxComponent: JhxComponentType<TDomBase, TReturn, TRequest, TReply>;
    };
};
