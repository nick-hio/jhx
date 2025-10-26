/**
 * @see https://htmx.org/reference/#events
 */
export const event = {
    /**
     * Send this event to an element to abort a request.
     *
     * @see https://htmx.org/events/#htmx:abort
     * @see https://htmx.org/attributes/hx-on/
     */
    abort: 'htmx:abort',

    /**
     * Triggered after an AJAX request has completed processing a successful response.
     *
     * @see https://htmx.org/events/#htmx:afterOnLoad
     * @see https://htmx.org/attributes/hx-on/
     */
    afterOnLoad: 'htmx:afterOnLoad',

    /**
     * Triggered after htmx has initialized a node.
     *
     * @see https://htmx.org/events/#htmx:afterProcessNode
     * @see https://htmx.org/attributes/hx-on/
     */
    afterProcessNode: 'htmx:afterProcessNode',

    /**
     * Triggered after an AJAX request has completed.
     *
     * @see https://htmx.org/events/#htmx:afterRequest
     * @see https://htmx.org/attributes/hx-on/
     */
    afterRequest: 'htmx:afterRequest',

    /**
     * Triggered after the DOM has settled.
     *
     * @see https://htmx.org/events/#htmx:afterSettle
     * @see https://htmx.org/attributes/hx-on/
     */
    afterSettle: 'htmx:afterSettle',

    /**
     * Triggered after new content has been swapped in.
     *
     * @see https://htmx.org/events/#htmx:afterSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    afterSwap: 'htmx:afterSwap',

    /**
     * 	triggered before htmx [disables](https://htmx.org/attributes/hx-disable/)
     * 	an element or removes it from the DOM
     *
     * @see https://htmx.org/events/#htmx:beforeCleanupElement
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeCleanupElement: 'htmx:beforeCleanupElement',

    /**
     * Triggered before any response processing occurs.
     *
     * @see https://htmx.org/events/#htmx:beforeOnLoad
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeOnLoad: 'htmx:beforeOnLoad',

    /**
     * Triggered before htmx initializes a node.
     *
     * @see https://htmx.org/events/#htmx:beforeProcessNode
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeProcessNode: 'htmx:beforeProcessNode',

    /**
     * Triggered before an AJAX request is made.
     *
     * @see https://htmx.org/events/#htmx:beforeRequest
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeRequest: 'htmx:beforeRequest',

    /**
     * Triggered before a swap is done, allows you to configure the swap.
     *
     * @see https://htmx.org/events/#htmx:beforeSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeSwap: 'htmx:beforeSwap',

    /**
     * Triggered just before an ajax request is sent.
     *
     * @see https://htmx.org/events/#htmx:beforeSend
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeSend: 'htmx:beforeSend',

    /**
     * Triggered before the
     * [View Transition](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) wrapped swap occurs.
     *
     * @see https://htmx.org/events/#htmx:beforeTransition
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeTransition: 'htmx:beforeTransition',

    /**
     * Triggered before the request, allows you to customize parameters and headers.
     *
     * @see https://htmx.org/events/#htmx:configRequest
     * @see https://htmx.org/attributes/hx-on/
     */
    configRequest: 'htmx:configRequest',

    /**
     * Triggered after a trigger occurs on an element, allows you to cancel (or delay) issuing the AJAX request.
     *
     * @see https://htmx.org/events/#htmx:confirm
     * @see https://htmx.org/attributes/hx-on/
     */
    confirm: 'htmx:confirm',

    /**
     * Triggered on an error during cache writing.
     *
     * @see https://htmx.org/events/#htmx:historyCacheError
     * @see https://htmx.org/attributes/hx-on/
     */
    historyCacheError: 'htmx:historyCacheError',

    /**
     * Triggered on a cache hit in the history subsystem.
     *
     * @see https://htmx.org/events/#htmx:historyCacheHit
     * @see https://htmx.org/attributes/hx-on/
     */
    historyCacheHit: 'htmx:historyCacheHit',

    /**
     * Triggered on a cache miss in the history subsystem.
     *
     * @see https://htmx.org/events/#htmx:historyCacheMiss
     * @see https://htmx.org/attributes/hx-on/
     */
    historyCacheMiss: 'htmx:historyCacheMiss',

    /**
     * Triggered on a unsuccessful remote retrieval.
     *
     * @see https://htmx.org/events/#htmx:historyCacheMissLoadError
     * @see https://htmx.org/attributes/hx-on/
     */
    historyCacheMissLoadError: 'htmx:historyCacheMissLoadError',

    /**
     * Triggered on a successful remote retrieval.
     *
     * @see https://htmx.org/events/#htmx:historyCacheMissLoad
     * @see https://htmx.org/attributes/hx-on/
     */
    historyCacheMissLoad: 'htmx:historyCacheMissLoad',

    /**
     * Triggered when htmx handles a history restoration action.
     *
     * @see https://htmx.org/events/#htmx:historyRestore
     * @see https://htmx.org/attributes/hx-on/
     */
    historyRestore: 'htmx:historyRestore',

    /**
     * Triggered before content is saved to the history cache.
     *
     * @see https://htmx.org/events/#htmx:beforeHistorySave
     * @see https://htmx.org/attributes/hx-on/
     */
    beforeHistorySave: 'htmx:beforeHistorySave',

    /**
     * Triggered when new content is added to the DOM.
     *
     * @see https://htmx.org/events/#htmx:load
     * @see https://htmx.org/attributes/hx-on/
     */
    load: 'htmx:load',

    /**
     * Triggered when an element refers to an SSE event in its trigger, but no parent SSE source has been defined.
     *
     * @see https://htmx.org/events/#htmx:noSSESourceError
     * @see https://htmx.org/attributes/hx-on/
     */
    noSSESourceError: 'htmx:noSSESourceError',

    /**
     * Triggered when an exception occurs during the onLoad handling in htmx.
     *
     * @see https://htmx.org/events/#htmx:onLoadError
     * @see https://htmx.org/attributes/hx-on/
     */
    onLoadError: 'htmx:onLoadError',

    /**
     * Triggered after an out-of-band element as been swapped in.
     *
     * @see https://htmx.org/events/#htmx:oobAfterSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    oobAfterSwap: 'htmx:oobAfterSwap',

    /**
     * Triggered before an out of band element swap is done, allows you to configure the swap.
     *
     * @see https://htmx.org/events/#htmx:oobBeforeSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    oobBeforeSwap: 'htmx:oobBeforeSwap',

    /**
     * Triggered when an out-of-band element does not have a matching ID in the current DOM.
     *
     * @see https://htmx.org/events/#htmx:oobErrorNoTarget
     * @see https://htmx.org/attributes/hx-on/
     */
    oobErrorNoTarget: 'htmx:oobErrorNoTarget',

    /**
     * Triggered after a prompt is shown.
     *
     * @see https://htmx.org/events/#htmx:prompt
     * @see https://htmx.org/attributes/hx-on/
     */
    prompt: 'htmx:prompt',

    /**
     * Triggered after a url is pushed into history.
     *
     * @see https://htmx.org/events/#htmx:pushedIntoHistory
     * @see https://htmx.org/attributes/hx-on/
     */
    pushedIntoHistory: 'htmx:pushedIntoHistory',

    /**
     * Triggered after a url is replaced in history.
     *
     * @see https://htmx.org/events/#htmx:replacedInHistory
     * @see https://htmx.org/attributes/hx-on/
     */
    replacedInHistory: 'htmx:replacedInHistory',

    /**
     * Triggered when an HTTP response error (non-`200` or `300` response code) occurs.
     *
     * @see https://htmx.org/events/#htmx:responseError
     * @see https://htmx.org/attributes/hx-on/
     */
    responseError: 'htmx:responseError',

    /**
     * Triggered when a request is aborted.
     *
     * @see https://htmx.org/events/#htmx:sendAbort
     * @see https://htmx.org/attributes/hx-on/
     */
    sendAbort: 'htmx:sendAbort',

    /**
     * Triggered when a network error prevents an HTTP request from happening.
     *
     * @see https://htmx.org/events/#htmx:sendError
     * @see https://htmx.org/attributes/hx-on/
     */
    sendError: 'htmx:sendError',

    /**
     * Triggered when an error occurs with a SSE source.
     *
     * @see https://htmx.org/events/#htmx:sseError
     * @see https://htmx.org/attributes/hx-on/
     */
    sseError: 'htmx:sseError',

    /**
     * Triggered when a SSE source is opened.
     *
     * @see https://htmx.org/events#htmx:sseOpen
     * @see https://htmx.org/attributes/hx-on/
     */
    sseOpen: 'htmx:sseOpen',

    /**
     * Triggered when an error occurs during the swap phase.
     *
     * @see https://htmx.org/events/#htmx:swapError
     * @see https://htmx.org/attributes/hx-on/
     */
    swapError: 'htmx:swapError',

    /**
     * Triggered when an invalid target is specified.
     *
     * @see https://htmx.org/events/#htmx:targetError
     * @see https://htmx.org/attributes/hx-on/
     */
    targetError: 'htmx:targetError',

    /**
     * Triggered when a request timeout occurs.
     *
     * @see https://htmx.org/events/#htmx:timeout
     * @see https://htmx.org/attributes/hx-on/
     */
    timeout: 'htmx:timeout',

    /**
     * Triggered when a request URL is validated.
     *
     * @see https://htmx.org/attributes/hx-on/
     */
    validateUrl: 'htmx:validateUrl',

    /**
     * Triggered before an element is validated.
     *
     * @see https://htmx.org/events/#htmx:validation:validate
     * @see https://htmx.org/attributes/hx-on/
     */
    validationValidate: 'htmx:validation:validate',

    /**
     * Triggered when an element fails validation.
     *
     * @see https://htmx.org/events/#htmx:validation:failed
     * @see https://htmx.org/attributes/hx-on/
     */
    validationFailed: 'htmx:validation:failed',

    /**
     * Triggered when a request is halted due to validation errors.
     *
     * @see https://htmx.org/events/#htmx:validation:halted
     * @see https://htmx.org/attributes/hx-on/
     */
    validationHalted: 'htmx:validation:halted',

    /**
     * Triggered when an ajax request aborts.
     *
     * @see https://htmx.org/events/#htmx:xhr:abort
     * @see https://htmx.org/attributes/hx-on/
     */
    xhrAbort: 'htmx:xhr:abort',

    /**
     * Triggered when an ajax request ends.
     *
     * @see https://htmx.org/events/#htmx:xhr:loadend
     * @see https://htmx.org/attributes/hx-on/
     */
    xhrLoadend: 'htmx:xhr:loadend',

    /**
     * Triggered when an ajax request starts.
     *
     * @see https://htmx.org/events/#htmx:xhr:loadstart
     * @see https://htmx.org/attributes/hx-on/
     */
    xhrLoadstart: 'htmx:xhr:loadstart',

    /**
     * Triggered periodically during an ajax request that supports progress events.
     *
     * @see https://htmx.org/events/#htmx:xhr:progress
     * @see https://htmx.org/attributes/hx-on/
     */
    xhrProgress: 'htmx:xhr:progress',
} as const;
