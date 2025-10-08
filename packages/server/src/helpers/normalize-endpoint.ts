import { posix } from 'path';

import { JhxServerException } from '../lib/jhx-server-error';

export const normalizeEndpoint = (
    endpoint: string,
    prefix: string = '',
): {
    noSlash: string;
    withSlash: string;
} => {
    const newPrefix = String(prefix).startsWith('/') ? String(prefix) : `/${prefix}`;

    let newRoute = endpoint.trim();
    newRoute = newRoute.startsWith('/') ? newRoute : `/${newRoute}`;

    let decoded: string;
    try {
        decoded = decodeURIComponent(newRoute.startsWith(newPrefix) ? newRoute : `${newPrefix}/${newRoute}`);
    } catch (e) {
        throw new JhxServerException('jhx: malformed endpoint', {
            type: 'endpoint:malformed',
            info: (e as Error).message,
            route: newRoute,
            cause: e as Error,
        });
    }

    let normalized = posix.normalize(decoded.startsWith('/') ? decoded : `/${decoded}`);
    if (normalized.length > 1 && normalized.endsWith('/')) {
        normalized = normalized.slice(0, -1);
    }

    return {
        noSlash: normalized,
        withSlash: normalized === '/' ? '/' : `${normalized}/`,
    };
};
