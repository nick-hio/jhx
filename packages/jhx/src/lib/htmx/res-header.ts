/**
 * https://htmx.org/reference/#response_headers
 */
export const resHeader = {
    /**
     * Allows you to do a client-side redirect that does not do a full page reload
     *
     * @see https://htmx.org/headers/hx-location/
     * @see https://htmx.org/reference/#response_headers
     */
    location: 'HX-Location',

    /**
     * Pushes a new url into the history stack.
     *
     * @see https://htmx.org/headers/hx-push-url/
     * @see https://htmx.org/reference/#response_headers
     */
    pushUrl: 'HX-Push-URL',

    /**
     * Can be used to do a client-side redirect to a new location.
     *
     * @see https://htmx.org/headers/hx-redirect/
     * @see https://htmx.org/reference/#response_headers
     */
    redirect: 'HX-Redirect',

    /**
     * If set to “true” the client-side will do a full refresh of the page.
     *
     * @see https://htmx.org/reference/#response_headers
     */
    refresh: 'HX-Refresh',

    /**
     * Replaces the current URL in the location bar.
     *
     * @see https://htmx.org/headers/hx-replace-url/
     * @see https://htmx.org/reference/#response_headers
     */
    replaceUrl: 'HX-Replace-URL',

    /**
     * Allows you to specify how the response will be swapped.
     * See [`hx-swap`](https://htmx.org/attributes/hx-swap/) for possible values
     *
     * @see https://htmx.org/reference/#response_headers
     */
    reswap: 'HX-Reswap',

    /**
     * A CSS selector that updates the target of the content update to a different element on the page.
     *
     * @see https://htmx.org/reference/#response_headers
     */
    retarget: 'HX-Retarget',

    /**
     * A CSS selector that allows you to choose which part of the response is used to be swapped in.
     * Overrides an existing [`hx-select`](https://htmx.org/attributes/hx-select/) on the triggering element
     *
     * @see https://htmx.org/reference/#response_headers
     */
    reselect: 'HX-Reselect',

    /**
     * Allows you to trigger client-side events.
     *
     * @see https://htmx.org/headers/hx-trigger/
     * @see https://htmx.org/reference/#response_headers
     */
    trigger: 'HX-Trigger',

    /**
     * Allows you to trigger client-side events after the settle step.
     *
     * @see https://htmx.org/headers/hx-trigger/
     * @see https://htmx.org/reference/#response_headers
     */
    triggerAfterSettle: 'HX-Trigger-After-Settle',

    /**
     * Allows you to trigger client-side events after the swap step.
     *
     * @see https://htmx.org/headers/hx-trigger/
     * @see https://htmx.org/reference/#response_headers
     */
    triggerAfterSwap: 'HX-Trigger-After-Swap',
} as const;

export type HtmxResponseHeader = (typeof resHeader)[keyof typeof resHeader];
