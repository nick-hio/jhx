import type { HtmxSwapStyle } from '../../lib/htmx';
import type { HtmxAjaxEtc } from './htmx-ajax-etc.ts';
import type { HtmxCacheItem } from './htmx-cache-item.ts';
import type { HtmxElementValidationError } from './htmx-element-validation-error.ts';
import type { HtmxHttpVerb } from './htmx-http-verb.ts';
import type { HtmxIssueRequest } from './htmx-issue-request.ts';
import type { HtmxPathInfo } from './htmx-path-info.ts';
import type { HtmxRequestConfig } from './htmx-request-config.ts';
import type { HtmxSwapSpec } from './htmx-swap-spec.ts';

export interface HtmxEventDetail {
    /**
     * Indicates if the request was boosted via `hx-boost`.
     */
    boosted?: boolean | undefined;

    /**
     * The content element to be swapped in.
     */
    content?: Element;

    /**
     * The element that triggered the event.
     */
    elt?: Element;

    /**
     * Validation errors for the target element.
     */
    errors?: HtmxElementValidationError[];

    /**
     * Additional AJAX-related information.
     */
    etc?: HtmxAjaxEtc;

    /**
     * Error message returned by the server.
     */
    error?: string;

    /**
     * The original DOM event associated with this detail.
     */
    event?: Event;

    /**
     * Exception caught during request handling.
     */
    exception?: Error;

    /**
     * Whether the request failed.
     */
    failed?: boolean;

    /**
     * Collected form data for the request.
     */
    formData?: FormData;

    /**
     * Fragment element extracted from the response.
     */
    fragment?: Element;

    /**
     * Parsed response headers as key/value pairs.
     */
    headers?: Record<string, string>;

    /**
     * Element used for history updates.
     */
    historyElt?: Element;

    /**
     * If true, update of document title is skipped.
     */
    ignoreTitle?: boolean | undefined;

    /**
     * True when the response status indicates an error.
     */
    isError?: boolean;

    /**
     * Details for issuing follow-up requests.
     */
    issueRequest?: HtmxIssueRequest;

    /**
     * Cached item associated with the request.
     */
    item?: HtmxCacheItem;

    /**
     * Retain CSS indicators after swap.
     */
    keepIndicators?: boolean;

    /**
     * Indicates if the total size is computable in progress events.
     */
    lengthComputable?: boolean;

    /**
     * Number of bytes loaded in progress events.
     */
    loaded?: number;

    /**
     * Message returned from the server.
     */
    message?: string;

    /**
     * Proxy for `formData` as a key/value map.
     */
    parameters?: Record<string, FormDataEntryValue | FormDataEntryValue[]>;

    /**
     * Request path used.
     */
    path?: string;

    /**
     * Parsed information about the request path.
     */
    pathInfo?: HtmxPathInfo;

    /**
     * Prompt text displayed to the user.
     */
    prompt?: string;

    /**
     * User response for confirmation or prompt dialogs.
     */
    question?: string | null;

    /**
     * Raw response text from the server.
     */
    response?: string;

    /**
     * Configuration used for the request.
     */
    requestConfig?: HtmxRequestConfig;

    /**
     * True if the response came from the same host.
     */
    sameHost?: boolean;

    /**
     * CSS selector used for swapping content.
     */
    select?: string | null;

    /**
     * Overrides the default swap selector.
     */
    selectOverride?: string | null;

    /**
     * Unparsed server response string.
     */
    serverResponse?: string;

    /**
     * Indicates whether a swap should occur.
     */
    shouldSwap?: boolean;

    /**
     * Associated `EventSource` for server-sent events.
     */
    source?: EventSource;

    /**
     * True if the request completed successfully.
     */
    successful?: boolean;

    /**
     * Overrides the swap style (e.g., `innerHTML`, `outerHTML`).
     */
    swapOverride?: HtmxSwapStyle | null;

    /**
     * Parsed specification for swapping.
     */
    swapSpec?: HtmxSwapSpec;

    /**
     * Target element for content swap.
     */
    target?: Element;

    /**
     * Timeout value for the request in milliseconds.
     */
    timeout?: number;

    /**
     * Total bytes expected in progress events.
     */
    total?: number;

    /**
     * The original event that triggered this HTMX event.
     */
    triggeringEvent?: Event;

    /**
     * Unfiltered form data before any modifications.
     */
    unfilteredFormData?: FormData;

    /**
     * Proxy for `unfilteredFormData` as a key/value map.
     */
    unfilteredParameters?: Record<string, FormDataEntryValue | FormDataEntryValue[]>;

    /**
     * Full URL used for the request.
     */
    url?: URL;

    /**
     * Whether URL parameters should be used instead of body.
     */
    useUrlParams?: boolean;

    /**
     * Validity state of the form element.
     */
    validity?: ValidityState;

    /**
     * HTTP method used for the request.
     */
    verb?: HtmxHttpVerb;

    /**
     * Whether credentials are included in the request.
     */
    withCredentials?: boolean;

    /**
     * Underlying `XMLHttpRequest` object.
     */
    xhr?: XMLHttpRequest;
}
