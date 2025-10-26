import type { HtmxSwapStyle } from './constants';
import type { HtmxAjaxHandler } from './htmx-ajax-handler.ts';

export interface HtmxAjaxEtc {
    /**
     * When true, returns a Promise that resolves with the AJAX response.
     */
    returnPromise?: boolean;

    /**
     * Custom handler invoked during the AJAX request lifecycle.
     */
    handler?: HtmxAjaxHandler;

    /**
     * CSS selector used to find the element(s) to swap content into.
     */
    select?: string | null;

    /**
     * Overrides the default target element for content swapping.
     */
    targetOverride?: Element;

    /**
     * Overrides the default swap strategy (e.g., "innerHTML", "outerHTML").
     */
    swapOverride?: HtmxSwapStyle;

    /**
     * Additional HTTP headers to include with the request.
     */
    headers?: Record<string, string>;

    /**
     * FormData instance containing key/value pairs to send with the request.
     */
    values?: FormData;

    /**
     * Indicates whether to include credentials (cookies, authorization headers) in the request.
     */
    credentials?: boolean;

    /**
     * Maximum time in milliseconds before the request times out.
     */
    timeout?: number;
}
