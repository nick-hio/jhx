/**
 * @see https://htmx.org/attributes/hx-swap/
 */
export const swap = {
    /**
     * Replace the inner html of the target element.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    innerHTML: 'innerHTML',

    /**
     * Replace the entire target element with the response.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    outerHTML: 'outerHTML',

    /**
     * Replace the text content of the target element, without parsing the response as HTML.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    textContent: 'textContent',

    /**
     * Insert the response before the target element.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    beforeBegin: 'beforebegin',

    /**
     * Insert the response before the first child of the target element.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    afterBegin: 'afterbegin',

    /**
     * Insert the response after the last child of the target element.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    beforeEnd: 'beforeend',

    /**
     * Insert the response after the target element.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    afterEnd: 'afterend',

    /**
     * Deletes the target element regardless of the response.
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    delete: 'delete',

    /**
     * Does not append content from response (out of band items will still be processed).
     *
     * @see https://htmx.org/attributes/hx-swap/
     */
    none: 'none',
} as const;
