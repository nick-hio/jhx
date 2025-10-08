import type { HtmxElementValidationError } from './htmx-element-validation-error.ts';
import type { HtmxHttpVerb } from './htmx-http-verb.ts';

export interface HtmxRequestConfig {
    /**
     * Indicates if the request was boosted via `hx-boost`.
     */
    boosted: boolean;

    /**
     * The element that initiated the HTMX request.
     */
    elt: Element;

    /**
     * Validation errors associated with the target element.
     */
    errors: HtmxElementValidationError[];

    /**
     * FormData object assembled for the request.
     */
    formData: FormData;

    /**
     * HTTP headers to include with the request.
     */
    headers: Record<string, string>;

    /**
     * Key/value pairs representing entries in `formData`.
     */
    parameters: Record<string, FormDataEntryValue | FormDataEntryValue[]>;

    /**
     * URL or path used for the HTMX request.
     */
    path: string;

    /**
     * Element into which the response content will be swapped.
     */
    target: Element;

    /**
     * Maximum time in milliseconds before the request times out.
     */
    timeout: number;

    /**
     * Original DOM event that triggered the HTMX request.
     */
    triggeringEvent: Event;

    /**
     * Unfiltered FormData before any HTMX processing.
     */
    unfilteredFormData: FormData;

    /**
     * Key/value pairs representing entries in `unfilteredFormData`.
     */
    unfilteredParameters: Record<string, FormDataEntryValue | FormDataEntryValue[]>;

    /**
     * Whether to include parameters in the URL instead of the request body.
     */
    useUrlParams: boolean;

    /**
     * HTTP method to use for the request (e.g.\ `"GET"`, `"POST"`).
     */
    verb: HtmxHttpVerb;

    /**
     * Whether to include credentials (cookies, authorization headers) with the request.
     */
    withCredentials: boolean;
}
