import type { Logger } from 'jhx';

import { JhxServerException } from '../lib/jhx-server-error';
import type { ServerJhxHandler, ServerJhxRoute } from '../types';
import { normalizeEndpoint } from './normalize-endpoint';

export const addRoutesToMap = <TReturn, TReq, TRes, THandler extends ServerJhxHandler<TReturn, TReq, TRes>>(
    routes: Array<ServerJhxRoute<TReturn, TReq, TRes, THandler>>,
    config: {
        debug: boolean;
        prefix: string;
        onRegistered: (method: string, route: string) => void;
        logger: Logger;
        trailingSlash: 'slash' | 'no-slash' | 'both';
    },
    map?: Map<string, ServerJhxHandler<TReturn, TReq, TRes>>,
) => {
    if (!map) {
        map = new Map();
    }
    if (!routes) {
        return map;
    }

    for (const route of routes) {
        const newMethod = route.method?.trim()?.toUpperCase() ?? 'GET';
        const { noSlash, withSlash } = normalizeEndpoint(route.route, config.prefix);

        if (config.trailingSlash === 'no-slash') {
            const key = `${newMethod}::${noSlash}`;
            if (map.has(key)) {
                throw new JhxServerException('jhx: routing error', {
                    type: 'route:duplicate',
                    info: `Cannot add duplicate route: ${newMethod} '${noSlash}'`,
                    method: newMethod,
                    route: noSlash,
                });
            }

            map.set(key, route.handler);
            config.onRegistered(newMethod, noSlash);

            if (config.debug) {
                config.logger.info(`[jhx] Added new route: ${newMethod} ${noSlash}`);
            }
        } else if (config.trailingSlash === 'slash') {
            const key = `${newMethod}::${withSlash}`;
            if (map.has(key)) {
                throw new JhxServerException('jhx: routing error', {
                    type: 'route:duplicate',
                    info: `Cannot add duplicate route: ${newMethod} '${noSlash}'`,
                    method: newMethod,
                    route: noSlash,
                });
            }

            map.set(key, route.handler);
            config.onRegistered(newMethod, withSlash);

            if (config.debug) {
                config.logger.info(`[jhx] Added new route: ${newMethod} ${withSlash}`);
            }
        } else {
            const keyNoSlash = `${newMethod}::${noSlash}`;
            const keyWithSlash = `${newMethod}::${withSlash}`;

            if (map.has(keyNoSlash)) {
                throw new JhxServerException('jhx: routing error', {
                    type: 'route:duplicate',
                    info: `Cannot add duplicate route: ${newMethod} '${noSlash}'`,
                    method: newMethod,
                    route: noSlash,
                });
            }
            if (map.has(keyWithSlash)) {
                throw new JhxServerException('jhx: routing error', {
                    type: 'route:duplicate',
                    info: `Cannot add duplicate route: ${newMethod} '${noSlash}'`,
                    method: newMethod,
                    route: noSlash,
                });
            }

            map.set(keyNoSlash, route.handler);
            map.set(keyWithSlash, route.handler);
            config.onRegistered(newMethod, noSlash);

            if (config.debug) {
                config.logger.info(`[jhx] Added new route: ${newMethod} ${noSlash}`);
            }
        }
    }

    return map;
};
