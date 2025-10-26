/**
 * @see https://htmx.org/reference/#classes
 */
export const css = {
    /**
     * Applied to a new piece of content before it is swapped, removed after it is settled.
     *
     * @see https://htmx.org/reference/#classes
     */
    added: 'htmx-added',

    /**
     * A dynamically generated class that will toggle visible (opacity:1) when a `htmx-request` class is present.
     *
     * @see https://htmx.org/reference/#classes
     */
    indicator: 'htmx-indicator',

    /**
     * Applied to either the element or the element specified with
     * [`hx-indicator`](https://htmx.org/attributes/hx-indicator/) while a request is ongoing
     *
     * @see https://htmx.org/reference/#classes
     */
    request: 'htmx-request',

    /**
     * Applied to a target after content is swapped, removed after it is settled.
     * The duration can be modified via [`hx-swap`](https://htmx.org/attributes/hx-swap/).
     *
     * @see https://htmx.org/reference/#classes
     */
    settling: 'htmx-settling',

    /**
     * Applied to a target before any content is swapped, removed after it is swapped.
     * The duration can be modified via [`hx-swap`](https://htmx.org/attributes/hx-swap/).
     *
     * @see https://htmx.org/reference/#classes
     */
    swapping: 'htmx-swapping',
} as const;
