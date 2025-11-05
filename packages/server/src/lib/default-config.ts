import { isValidElement } from 'react';
import { renderToString } from 'react-dom/server';

import { defaultConfig as baseDefaultConfig } from 'jhx';

import type { JhxOnRegistered } from '../types';

export const serverDefaultConfig = {
    ...baseDefaultConfig,
    contentType: 'text/html',
    debug: false,
    middleware: [],
    onRegistered: ((_m: string, _r: string) => {}) as JhxOnRegistered,
    prefix: '/_jhx',
    render: (data: any, ..._args: any[]) => (isValidElement(data) ? renderToString(data) : data),
    renderError: true,
    renderMiddleware: true,
    renderNotFound: true,
    trailingSlash: 'both',
} as const;
