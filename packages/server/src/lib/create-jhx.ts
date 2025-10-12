import { jhx as jhxBase } from 'jhx';
import type { HtmxHttpMethod, JhxConfig as JhxConfigBase } from 'jhx';

import { addRoutesToMap } from '../helpers/add-routes-to-map';
import { getRenderFunction } from '../helpers/get-render-function';
import { hashFunction } from '../helpers/hash-function';
import { normalizeEndpoint } from '../helpers/normalize-endpoint';
import { validateRoutes } from '../helpers/validate-routes';
import type {
    HttpMethodUpperCase,
    JhxErrorType,
    NormalizedServerJhxConfig,
    ServerCreateJhxConfig,
    ServerJhxComponentProps,
    ServerJhxDomProps,
    ServerJhxErrorHandler,
    ServerJhxHandler,
    ServerJhxPartialRoute,
    ServerJhxProps,
    ServerJhxRenderHandler,
    ServerJhxRoute,
} from '../types';
import { createJhxComponent } from './create-jhx-component';
import { serverDefaultConfig } from './default-config';

export const createServerJhx = <
    TDomBase extends object,
    TReturn,
    TResolved,
    TRendered,
    TError extends JhxErrorType,
    TReq,
    TRes,
    TBaseStringify extends boolean | undefined,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TErrorHandler extends ServerJhxErrorHandler<TError, TReturn, TReq, TRes>,
    TRenderHandler extends ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes>,
    TBaseProps extends ServerJhxProps<TDomBase, TReturn, TReq, TRes, THandler>,
    TCompProps extends ServerJhxComponentProps<TDomBase, TReturn, TReq, TRes, THandler, TBaseProps>,
    TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
    TInstanceOptions = undefined
>(
    config: ServerCreateJhxConfig<
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
    > & {
        stringify?: TBaseStringify;
    },
    notFoundHandler: ServerJhxHandler<TReturn, TReq, TRes> | ((data: any, ..._args: any[]) => any),
    registerCatchAllRoute: (
        baseConfig: NormalizedServerJhxConfig<
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
        routes: Map<string, ServerJhxHandler<TReturn, TReq, TRes>>,
    ) => void,
) => {
    const baseConfig = {
        contentType:
            config.contentType === null ? null : (config.contentType ?? serverDefaultConfig.contentType),
        debug: config.debug === serverDefaultConfig.debug,
        errorHandler: config.errorHandler,
        middleware: Array.isArray(config.middleware)
            ? config.middleware
            : config.middleware
              ? [config.middleware]
              : serverDefaultConfig.middleware,
        notFoundHandler: config.notFoundHandler ? config.notFoundHandler : notFoundHandler,
        onRegistered: config.onRegistered ?? serverDefaultConfig.onRegistered,
        logger: config.logger ?? serverDefaultConfig.logger,
        prefix: config.prefix ? normalizeEndpoint(config.prefix).noSlash : serverDefaultConfig.prefix,
        render:
            typeof config.render === 'function'
                ? config.render
                : (getRenderFunction<TResolved, TRendered, TReq, TRes>(
                      config.render === undefined ? 'static' : config.render,
                  ) as TRenderHandler),
        renderError:
            typeof config.renderError === 'boolean' ? config.renderError : serverDefaultConfig.renderError,
        renderMiddleware:
            typeof config.renderMiddleware === 'boolean'
                ? config.renderMiddleware
                : serverDefaultConfig.renderMiddleware,
        renderNotFound:
            typeof config.renderNotFound === 'boolean'
                ? config.renderNotFound
                : serverDefaultConfig.renderNotFound,
        stringify: typeof config.stringify === 'boolean' ? config.stringify : serverDefaultConfig.stringify,
        trailingSlash: config.trailingSlash ?? serverDefaultConfig.trailingSlash,
        instanceOptions: config.instanceOptions,
    } as const as NormalizedServerJhxConfig<
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
    >;

    const routeMap: Map<string, ServerJhxHandler<TReturn, TReq, TRes>> = config.routes
        ? addRoutesToMap<TReturn, TReq, TRes, THandler>(
              validateRoutes<TReturn, TReq, TRes, THandler>(config.routes),
              {
                  debug: baseConfig.debug,
                  logger: baseConfig.logger,
                  onRegistered: baseConfig.onRegistered,
                  prefix: baseConfig.prefix,
                  trailingSlash: baseConfig.trailingSlash,
              },
          )
        : new Map();

    registerCatchAllRoute(baseConfig, routeMap);

    function jhx<TDom extends object | TDomBase = TDomBase>(
        props: ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>,
        cfg: JhxConfigBase & { stringify: true },
    ): string;
    function jhx<TDom extends object | TDomBase = TDomBase>(
        props: ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
        cfg: JhxConfigBase & { stringify: false },
    ): Record<string, string>;
    function jhx<TDom extends object | TDomBase = TDomBase>(
        props: TBaseStringify extends true
            ? ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>
            : ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
        cfg?: JhxConfigBase,
    ): TBaseStringify extends true ? string : Record<string, string>;
    function jhx<TDom extends object | TDomBase = TDomBase>(
        props:
            | ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>
            | ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>,
        cfg?: JhxConfigBase,
    ): string | Record<string, string> {
        if (typeof props === 'object' && typeof props.handler === 'function') {
            const method = props.method?.trim()?.toUpperCase() ?? 'GET';
            const { noSlash, withSlash } = normalizeEndpoint(
                props.route?.trim() || hashFunction(props.handler),
                baseConfig.prefix,
            );

            if (baseConfig.trailingSlash === 'no-slash') {
                const key = `${method}::${noSlash}`;

                if (!routeMap.has(key)) {
                    if (baseConfig.debug) {
                        baseConfig.logger.info(`[jhx] Added new route: ${method} ${noSlash}`);
                    }
                    routeMap.set(key, props.handler);
                    baseConfig.onRegistered(method, noSlash);
                }

                props.method = method as HtmxHttpMethod;
                props.route = noSlash;
            } else if (baseConfig.trailingSlash === 'slash') {
                const key = `${method}::${withSlash}`;

                if (!routeMap.has(key)) {
                    if (baseConfig.debug) {
                        baseConfig.logger.info(`[jhx] Added new route: ${method} ${withSlash}`);
                    }
                    routeMap.set(key, props.handler);
                    baseConfig.onRegistered(method, withSlash);
                }

                props.method = method as HtmxHttpMethod;
                props.route = withSlash;
            } else {
                const keyNoSlash = `${method}::${noSlash}`;
                const keyWithSlash = `${method}::${withSlash}`;

                if (!routeMap.has(keyNoSlash) && !routeMap.has(keyWithSlash)) {
                    if (baseConfig.debug) {
                        baseConfig.logger.info(`[jhx] Added new route: ${method} ${noSlash}`);
                    }

                    routeMap.set(keyNoSlash, props.handler);
                    routeMap.set(keyWithSlash, props.handler);

                    baseConfig.onRegistered(method, noSlash);
                }

                props.method = method as HtmxHttpMethod;
                props.route = noSlash;
            }
        }

        return jhxBase<TDom>(props, {
            logger: cfg?.logger ?? baseConfig.logger,
            stringify: cfg?.stringify ?? baseConfig.stringify,
        });
    }

    jhx.addRoute = (newRoute: ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>): void => {
        addRoutesToMap<TReturn, TReq, TRes, THandler>(
            validateRoutes<TReturn, TReq, TRes, THandler>({
                method: newRoute.method,
                route: newRoute.route,
                handler: newRoute.handler,
            }),
            {
                debug: baseConfig.debug,
                logger: baseConfig.logger,
                onRegistered: baseConfig.onRegistered,
                prefix: baseConfig.prefix,
                trailingSlash: baseConfig.trailingSlash,
            },
            routeMap,
        );
    };

    jhx.addRoutes = (newRoutes: Array<ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>>): void => {
        addRoutesToMap<TReturn, TReq, TRes, THandler>(
            validateRoutes<TReturn, TReq, TRes, THandler>(newRoutes),
            {
                debug: baseConfig.debug,
                logger: baseConfig.logger,
                onRegistered: baseConfig.onRegistered,
                prefix: baseConfig.prefix,
                trailingSlash: baseConfig.trailingSlash,
            },
            routeMap,
        );
    };

    jhx.clearRoutes = () => {
        const size = routeMap.size;
        routeMap.clear();
        if (baseConfig.debug) {
            baseConfig.logger.info(`[jhx] Cleared ${size} route${size === 1 ? '' : 's'}`);
        }
    };

    jhx.getRoute = (method: string, route: string): TRoute | null => {
        const newMethod = method.trim().toUpperCase();
        const { noSlash, withSlash } = normalizeEndpoint(route, baseConfig.prefix);

        if (baseConfig.trailingSlash === 'no-slash') {
            const key = `${newMethod}::${noSlash}`;
            const handler = routeMap.get(key);

            if (!handler) return null;
            return {
                method: newMethod as HttpMethodUpperCase,
                route: noSlash,
                handler,
            } as TRoute;
        } else if (baseConfig.trailingSlash === 'slash') {
            const handler = routeMap.get(`${newMethod}::${withSlash}`);

            if (!handler) return null;
            return {
                method: newMethod as HttpMethodUpperCase,
                route: withSlash,
                handler,
            } as TRoute;
        } else {
            const noSlashHandler = routeMap.get(`${newMethod}::${noSlash}`);
            const withSlashHandler = routeMap.get(`${newMethod}::${withSlash}`);
            if (!noSlashHandler && !withSlashHandler) return null;

            const endsWithSlash = route.endsWith('/');
            const handler = endsWithSlash
                ? (withSlashHandler ?? noSlashHandler)
                : (noSlashHandler ?? withSlashHandler);
            const finalRoute = endsWithSlash
                ? withSlashHandler
                    ? withSlash
                    : noSlash
                : noSlashHandler
                  ? noSlash
                  : withSlash;

            return {
                method: newMethod as HttpMethodUpperCase,
                route: finalRoute,
                handler,
            } as TRoute;
        }
    };

    jhx.getRoutes = () => {
        return Array.from(routeMap.entries())
            .map(([key, handler]) => {
                const [method, endpoint] = key.split('::');
                if (!method || !endpoint) return null;
                return { method, route: endpoint, handler };
            })
            .filter((item): item is TRoute => item !== null);
    };

    jhx.hasRoute = (method: string, route: string): boolean => {
        const { noSlash, withSlash } = normalizeEndpoint(route, baseConfig.prefix);
        return (
            routeMap.has(`${method.toUpperCase()}::${noSlash}`)
            || routeMap.has(`${method.toUpperCase()}::${withSlash}`)
        );
    };

    jhx.removeRoute = (method: string, route: string): boolean => {
        const newMethod = method.trim().toUpperCase();
        const { noSlash, withSlash } = normalizeEndpoint(route, baseConfig.prefix);

        let result;

        if (baseConfig.trailingSlash === 'no-slash') {
            result = routeMap.delete(`${newMethod}::${noSlash}`);
        } else if (baseConfig.trailingSlash === 'slash') {
            result = routeMap.delete(`${newMethod}::${withSlash}`);
        } else {
            result = routeMap.delete(`${newMethod}::${noSlash}`);
            result = routeMap.delete(`${newMethod}::${withSlash}`) || result;
        }

        if (result && baseConfig.debug) {
            baseConfig.logger.info(
                `[jhx] Removed route: ${newMethod} ${baseConfig.trailingSlash === 'no-slash' ? noSlash : baseConfig.trailingSlash === 'slash' ? withSlash : `${noSlash} / ${withSlash}`}`,
            );
        } else if (!result && baseConfig.debug) {
            baseConfig.logger.info(
                `[jhx] Cannot remove unknown route: ${newMethod} ${baseConfig.trailingSlash === 'no-slash' ? noSlash : baseConfig.trailingSlash === 'slash' ? withSlash : `${noSlash} / ${withSlash}`}`,
            );
        }

        return result;
    };

    return {
        jhx,
        JhxComponent: createJhxComponent<
            TDomBase,
            TReturn,
            TReq,
            TRes,
            THandler,
            TBaseProps,
            TCompProps,
            TRoute,
            TPartialRoute
        >(jhx as any),
    };
};
