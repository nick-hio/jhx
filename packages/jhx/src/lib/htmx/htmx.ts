import { attribute } from './attribute';
import { css } from './css';
import { defaultHtmxConfig } from './default-htmx-config';
import { event } from './event';
import { eventAttribute } from './event-attribute';
import { extension } from './extension';
import { method } from './method';
import { reqHeader } from './req-header';
import { resHeader } from './res-header';
import { swap } from './swap';
import { sync } from './sync';

/**
 * @see https://htmx.org/reference/
 * @see https://htmx.org/docs/
 */
export const htmx = {
    attr: attribute,
    config: defaultHtmxConfig,
    css,
    event,
    eventAttr: eventAttribute,
    ext: extension,
    method,
    res: resHeader,
    req: reqHeader,
    swap,
    sync,
} as const;
