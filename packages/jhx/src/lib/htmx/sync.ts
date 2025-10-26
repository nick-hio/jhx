/**
 * @see https://htmx.org/attributes/hx-sync/
 */
export const sync = {
    /**
     * Drop (ignore) this request if an existing request is in flight (the default).
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    drop: 'drop',

    /**
     * Drop (ignore) this request if an existing request is in flight, and, if that is not the case,
     * abort this request if another request occurs while it is still in flight
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    abort: 'abort',

    /**
     * Abort the current request, if any, and replace it with this request.
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    replace: 'replace',

    /**
     * Place this request in the request queue associated with the given element.
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    queue: 'queue',

    /**
     * Queue the first request to show up while a request is in flight.
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    queueAll: 'queue all',

    /**
     * Queue the last request to show up while a request is in flight.
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    queueFirst: 'queue first',

    /**
     * Queue all requests that show up while a request is in flight.
     *
     * @see https://htmx.org/attributes/hx-sync/
     */
    queueLast: 'queue last',
} as const;
