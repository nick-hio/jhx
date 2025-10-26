import { htmx } from '../../lib/htmx';

/** @see https://htmx.org/reference/#attributes */
export type HtmxAttribute = (typeof htmx.attr)[keyof typeof htmx.attr];

/** @see https://htmx.org/reference/#classes */
export type HtmxClass = (typeof htmx.css)[keyof typeof htmx.css];

/** @see https://htmx.org/reference/#events */
export type HtmxEventName = (typeof htmx.event)[keyof typeof htmx.event];

/**
 * @see https://htmx.org/reference/#events
 * @see https://htmx.org/attributes/hx-on/
 */
export type HtmxEventAttribute =
    | (typeof htmx.eventAttr)[keyof typeof htmx.eventAttr]
    | `hx-on--${string}`
    | `hx-on-${string}`;

export interface HtmxExtensionMetadata {
    /* Name of the extension for attributes. */
    name: string;
    /* Current NPM version. */
    version: string;
    /* NPM registry name. */
    npm?: string;
    /* CDN URL(s) and integrity hashes. */
    cdn?: Array<{
        /* URL of the CDN file. */
        url: string;
        /* Integrity hash for the CDN file. */
        integrity?: string;
    }>;
}
export type HtmxDefaultExtension = (typeof htmx.ext)[keyof typeof htmx.ext]['name'];

/**
 * @see https://htmx.org/docs/#ajax
 * @see https://htmx.org/reference/#attributes
 */
export type HtmxHttpMethod = keyof typeof htmx.method;

/**
 * @see https://htmx.org/docs/#ajax
 * @see https://htmx.org/reference/#attributes
 */
export type HtmxMethodAttribute = (typeof htmx.method)[keyof typeof htmx.method];

export type HtmxRequestHeader = (typeof htmx.req)[keyof typeof htmx.req];

export type HtmxResponseHeader = (typeof htmx.res)[keyof typeof htmx.res];

export type HtmxSwapStyle = (typeof htmx.swap)[keyof typeof htmx.swap];

export type HtmxSyncStrategy = (typeof htmx.sync)[keyof typeof htmx.sync];
