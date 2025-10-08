import type { HtmxAjaxEtc } from './htmx-ajax-etc.ts';
import type { HtmxPathInfo } from './htmx-path-info.ts';
import type { HtmxRequestConfig } from './htmx-request-config.ts';

/**
 * Callback invoked during the HTMX AJAX lifecycle.
 */
export type HtmxAjaxHandler = (
    elt: Element,
    responseInfo: {
        /**
         * The underlying `XMLHttpRequest` instance.
         */
        xhr: XMLHttpRequest;

        /**
         * Element into which the response content will be swapped.
         */
        target: Element;

        /**
         * Configuration used for the HTMX request.
         */
        requestConfig: HtmxRequestConfig;

        /**
         * Additional AJAX-specific options and callbacks.
         */
        etc: HtmxAjaxEtc;

        /**
         * Indicates whether the request was boosted via `hx-boost`.
         */
        boosted: boolean;

        /**
         * CSS selector used for swapping content.
         */
        select: string;

        /**
         * Parsed path information for the request URL.
         */
        pathInfo: HtmxPathInfo;

        /**
         * True if the request failed.
         */
        failed?: boolean;

        /**
         * True if the request completed successfully.
         */
        successful?: boolean;

        /**
         * Whether to retain CSS indicators after the swap.
         */
        keepIndicators?: boolean;
    },
) => any;
