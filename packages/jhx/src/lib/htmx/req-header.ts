/**
 * https://htmx.org/reference/#request_headers
 */
export const reqHeader = {
    /**
     * Indicates that the request is via an element using [hx-boost](https://htmx.org/attributes/hx-boost/).
     *
     * @see https://htmx.org/reference/#request_headers
     */
    boosted: 'HX-Boosted',

    /**
     * The current URL of the browser
     *
     * @see https://htmx.org/reference/#request_headers
     */
    currentUrl: 'HX-Current-URL',

    /**
     * “true” if the request is for history restoration after a miss in the local history cache.
     *
     * @see https://htmx.org/reference/#request_headers
     */
    historyRestoreRequest: 'HX-History-Restore-Request',

    /**
     * The user response to an [hx-prompt](https://htmx.org/attributes/hx-prompt/).
     *
     * @see https://htmx.org/reference/#request_headers
     */
    prompt: 'HX-Prompt',

    /**
     * Always “true”.
     *
     * @see https://htmx.org/reference/#request_headers
     */
    request: 'HX-Request',

    /**
     * The `id` of the target element if it exists.
     *
     * @see https://htmx.org/reference/#request_headers
     */
    target: 'HX-Target',

    /**
     * The `name` of the triggered element if it exists.
     *
     * @see https://htmx.org/reference/#request_headers
     */
    triggerName: 'HX-Trigger-Name',

    /**
     * The `id` of the triggered element if it exists.
     *
     * @see https://htmx.org/reference/#request_headers
     */
    trigger: 'HX-Trigger',
} as const;
