import { attribute } from './attribute';
import { css } from './css';
import { defaultHtmxConfig } from './default-htmx-config';
import { event } from './event';
import { extension } from './extension';
import { method } from './method';
import { reqHeader } from './req-header';
import { resHeader } from './res-header';
import { swap } from './swap';
import { syncStrategy } from './sync-strategy';

/**
 * @see https://htmx.org/reference/
 * @see https://htmx.org/docs/
 */
export const htmx = {
    attribute,
    css,
    defaultConfig: defaultHtmxConfig,
    extension,
    event,
    method,
    reqHeader,
    resHeader,
    swap,
    syncStrategy,
} as const;
