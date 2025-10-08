import { JhxServerException } from '../lib/jhx-server-error';
import type { HttpMethodUpperCase, ServerJhxHandler, ServerJhxPartialRoute, ServerJhxRoute } from '../types';

export const validateRoutes = <TReturn, TReq, TRes, THandler extends ServerJhxHandler<TReturn, TReq, TRes>>(
    routes:
        | ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>
        | Array<ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>>,
) => {
    const newRoutes: Array<ServerJhxRoute<TReturn, TReq, TRes, THandler>> = [];

    if (!routes) {
        return newRoutes;
    }

    for (const route of Array.isArray(routes) ? routes : [routes]) {
        if (route.method && route.method.trim() === '') {
            throw new JhxServerException('jhx: route validation error', {
                type: 'route:invalid-method',
                info: `Invalid route method: '${route.method}'`,
                method: String(route.method),
            });
        }

        if (!route.route || route.route?.trim() === '') {
            throw new JhxServerException('jhx: route validation error', {
                type: 'route:invalid-path',
                info: `Invalid route endpoint: '${route.route}'`,
                method: route.method?.toUpperCase() ?? 'GET',
                route: String(route.route),
            });
        }

        if (!route.handler || typeof route.handler !== 'function') {
            throw new JhxServerException('jhx: route validation error', {
                type: 'route:invalid-handler',
                info: `Invalid route handler for '${route.method?.toUpperCase() ?? 'GET'} ${route.route}'`,
                method: route.method?.toUpperCase() ?? 'GET',
                route: route.route,
            });
        }

        newRoutes.push({
            method: (route.method?.toUpperCase() ?? 'GET') as HttpMethodUpperCase,
            route: route.route,
            handler: route.handler,
        });
    }

    return newRoutes;
};
