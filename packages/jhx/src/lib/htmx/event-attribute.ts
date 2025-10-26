/**
 * @see https://htmx.org/reference/#events
 */
export const eventAttribute = {
    /**
     * Send this event to an element to abort a request.
     *
     * @see https://htmx.org/events/#htmx:abort
     * @see https://htmx.org/attributes/hx-on/
     */
    onAbort: 'hx-on--abort',

    /**
     * Triggered after an AJAX request has completed processing a successful response.
     *
     * @see https://htmx.org/events/#htmx:afterOnLoad
     * @see https://htmx.org/attributes/hx-on/
     */
    onAfterOnLoad: 'hx-on--after-on-load',

    /**
     * Triggered after htmx has initialized a node.
     *
     * @see https://htmx.org/events/#htmx:afterProcessNode
     * @see https://htmx.org/attributes/hx-on/
     */
    onAfterProcessNode: 'hx-on--after-process-node',

    /**
     * Triggered after an AJAX request has completed.
     *
     * @see https://htmx.org/events/#htmx:afterRequest
     * @see https://htmx.org/attributes/hx-on/
     */
    onAfterRequest: 'hx-on--after-request',

    /**
     * Triggered after the DOM has settled.
     *
     * @see https://htmx.org/events/#htmx:afterSettle
     * @see https://htmx.org/attributes/hx-on/
     */
    onAfterSettle: 'hx-on--after-settle',

    /**
     * Triggered after new content has been swapped in.
     *
     * @see https://htmx.org/events/#htmx:afterSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    onAfterSwap: 'hx-on--after-swap',

    /**
     * 	triggered before htmx [disables](https://htmx.org/attributes/hx-disable/)
     * 	an element or removes it from the DOM
     *
     * @see https://htmx.org/events/#htmx:beforeCleanupElement
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeCleanupElement: 'hx-on--before-cleanup-element',

    /**
     * Triggered before any response processing occurs.
     *
     * @see https://htmx.org/events/#htmx:beforeOnLoad
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeOnLoad: 'hx-on--before-on-load',

    /**
     * Triggered before htmx initializes a node.
     *
     * @see https://htmx.org/events/#htmx:beforeProcessNode
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeProcessNode: 'hx-on--before-process-node',

    /**
     * Triggered before an AJAX request is made.
     *
     * @see https://htmx.org/events/#htmx:beforeRequest
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeRequest: 'hx-on--before-request',

    /**
     * Triggered before a swap is done, allows you to configure the swap.
     *
     * @see https://htmx.org/events/#htmx:beforeSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeSwap: 'hx-on--before-swap',

    /**
     * Triggered just before an ajax request is sent.
     *
     * @see https://htmx.org/events/#htmx:beforeSend
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeSend: 'hx-on--before-send',

    /**
     * Triggered before the
     * [View Transition](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) wrapped swap occurs.
     *
     * @see https://htmx.org/events/#htmx:beforeTransition
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeTransition: 'hx-on--before-transition',

    /**
     * Triggered before the request, allows you to customize parameters and headers.
     *
     * @see https://htmx.org/events/#htmx:configRequest
     * @see https://htmx.org/attributes/hx-on/
     */
    onConfigRequest: 'hx-on--config-request',

    /**
     * Triggered after a trigger occurs on an element, allows you to cancel (or delay) issuing the AJAX request.
     *
     * @see https://htmx.org/events/#htmx:confirm
     * @see https://htmx.org/attributes/hx-on/
     */
    onConfirm: 'hx-on--confirm',

    /**
     * Triggered on an error during cache writing.
     *
     * @see https://htmx.org/events/#htmx:historyCacheError
     * @see https://htmx.org/attributes/hx-on/
     */
    onHistoryCacheError: 'hx-on--history-cache-error',

    /**
     * Triggered on a cache hit in the history subsystem.
     *
     * @see https://htmx.org/events/#htmx:historyCacheHit
     * @see https://htmx.org/attributes/hx-on/
     */
    onHistoryCacheHit: 'hx-on--history-cache-hit',

    /**
     * Triggered on a cache miss in the history subsystem.
     *
     * @see https://htmx.org/events/#htmx:historyCacheMiss
     * @see https://htmx.org/attributes/hx-on/
     */
    onHistoryCacheMiss: 'hx-on--history-cache-miss',

    /**
     * Triggered on a unsuccessful remote retrieval.
     *
     * @see https://htmx.org/events/#htmx:historyCacheMissLoadError
     * @see https://htmx.org/attributes/hx-on/
     */
    onHistoryCacheMissLoadError: 'hx-on--history-cache-miss-load-error',

    /**
     * Triggered on a successful remote retrieval.
     *
     * @see https://htmx.org/events/#htmx:historyCacheMissLoad
     * @see https://htmx.org/attributes/hx-on/
     */
    onHistoryCacheMissLoad: 'hx-on--history-cache-miss-load',

    /**
     * Triggered when htmx handles a history restoration action.
     *
     * @see https://htmx.org/events/#htmx:historyRestore
     * @see https://htmx.org/attributes/hx-on/
     */
    onHistoryRestore: 'hx-on--history-restore',

    /**
     * Triggered before content is saved to the history cache.
     *
     * @see https://htmx.org/events/#htmx:beforeHistorySave
     * @see https://htmx.org/attributes/hx-on/
     */
    onBeforeHistorySave: 'hx-on--before-history-save',

    /**
     * Triggered when new content is added to the DOM.
     *
     * @see https://htmx.org/events/#htmx:load
     * @see https://htmx.org/attributes/hx-on/
     */
    onLoad: 'hx-on--load',

    /**
     * Triggered when an element refers to an SSE event in its trigger, but no parent SSE source has been defined.
     *
     * @see https://htmx.org/events/#htmx:noSSESourceError
     * @see https://htmx.org/attributes/hx-on/
     */
    onNoSSESourceError: 'hx-on--no-sse-source-error',

    /**
     * Triggered when an exception occurs during the onLoad handling in htmx.
     *
     * @see https://htmx.org/events/#htmx:onLoadError
     * @see https://htmx.org/attributes/hx-on/
     */
    onOnLoadError: 'hx-on--on-load-error',

    /**
     * Triggered after an out-of-band element as been swapped in.
     *
     * @see https://htmx.org/events/#htmx:oobAfterSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    onOobAfterSwap: 'hx-on--oob-after-swap',

    /**
     * Triggered before an out of band element swap is done, allows you to configure the swap.
     *
     * @see https://htmx.org/events/#htmx:oobBeforeSwap
     * @see https://htmx.org/attributes/hx-on/
     */
    onOobBeforeSwap: 'hx-on--oob-before-swap',

    /**
     * Triggered when an out-of-band element does not have a matching ID in the current DOM.
     *
     * @see https://htmx.org/events/#htmx:oobErrorNoTarget
     * @see https://htmx.org/attributes/hx-on/
     */
    onOobErrorNoTarget: 'hx-on--oob-error-no-target',

    /**
     * Triggered after a prompt is shown.
     *
     * @see https://htmx.org/events/#htmx:prompt
     * @see https://htmx.org/attributes/hx-on/
     */
    onPrompt: 'hx-on--prompt',

    /**
     * Triggered after a url is pushed into history.
     *
     * @see https://htmx.org/events/#htmx:pushedIntoHistory
     * @see https://htmx.org/attributes/hx-on/
     */
    onPushedIntoHistory: 'hx-on--pushed-into-history',

    /**
     * Triggered after a url is replaced in history.
     *
     * @see https://htmx.org/events/#htmx:replacedInHistory
     * @see https://htmx.org/attributes/hx-on/
     */
    onReplacedInHistory: 'hx-on--replaced-in-history',

    /**
     * Triggered when an HTTP response error (non-`200` or `300` response code) occurs.
     *
     * @see https://htmx.org/events/#htmx:responseError
     * @see https://htmx.org/attributes/hx-on/
     */
    onResponseError: 'hx-on--response-error',

    /**
     * Triggered when a request is aborted.
     *
     * @see https://htmx.org/events/#htmx:sendAbort
     * @see https://htmx.org/attributes/hx-on/
     */
    onSendAbort: 'hx-on--send-abort',

    /**
     * Triggered when a network error prevents an HTTP request from happening.
     *
     * @see https://htmx.org/events/#htmx:sendError
     * @see https://htmx.org/attributes/hx-on/
     */
    onSendError: 'hx-on--send-error',

    /**
     * Triggered when an error occurs with a SSE source.
     *
     * @see https://htmx.org/events/#htmx:sseError
     * @see https://htmx.org/attributes/hx-on/
     */
    onSseError: 'hx-on--sse-error',

    /**
     * Triggered when a SSE source is opened.
     *
     * @see https://htmx.org/events#htmx:sseOpen
     * @see https://htmx.org/attributes/hx-on/
     */
    onSseOpen: 'hx-on--sse-open',

    /**
     * Triggered when an error occurs during the swap phase.
     *
     * @see https://htmx.org/events/#htmx:swapError
     * @see https://htmx.org/attributes/hx-on/
     */
    onSwapError: 'hx-on--swap-error',

    /**
     * Triggered when an invalid target is specified.
     *
     * @see https://htmx.org/events/#htmx:targetError
     * @see https://htmx.org/attributes/hx-on/
     */
    onTargetError: 'hx-on--target-error',

    /**
     * Triggered when a request timeout occurs.
     *
     * @see https://htmx.org/events/#htmx:timeout
     * @see https://htmx.org/attributes/hx-on/
     */
    onTimeout: 'hx-on--timeout',

    /**
     * Triggered when a request URL is validated.
     *
     * @see https://htmx.org/attributes/hx-on/
     */
    onValidateUrl: 'hx-on--validate-url',

    /**
     * Triggered before an element is validated.
     *
     * @see https://htmx.org/events/#htmx:validation:validate
     * @see https://htmx.org/attributes/hx-on/
     */
    onValidationValidate: 'hx-on--validation-validate',

    /**
     * Triggered when an element fails validation.
     *
     * @see https://htmx.org/events/#htmx:validation:failed
     * @see https://htmx.org/attributes/hx-on/
     */
    onValidationFailed: 'hx-on--validation-failed',

    /**
     * Triggered when a request is halted due to validation errors.
     *
     * @see https://htmx.org/events/#htmx:validation:halted
     * @see https://htmx.org/attributes/hx-on/
     */
    onValidationHalted: 'hx-on--validation-halted',

    /**
     * Triggered when an ajax request aborts.
     *
     * @see https://htmx.org/events/#htmx:xhr:abort
     * @see https://htmx.org/attributes/hx-on/
     */
    onXhrAbort: 'hx-on--xhr-abort',

    /**
     * Triggered when an ajax request ends.
     *
     * @see https://htmx.org/events/#htmx:xhr:loadend
     * @see https://htmx.org/attributes/hx-on/
     */
    onXhrLoadend: 'hx-on--xhr-loadend',

    /**
     * Triggered when an ajax request starts.
     *
     * @see https://htmx.org/events/#htmx:xhr:loadstart
     * @see https://htmx.org/attributes/hx-on/
     */
    onXhrLoadstart: 'hx-on--xhr-loadstart',

    /**
     * Triggered periodically during an ajax request that supports progress events.
     *
     * @see https://htmx.org/events/#htmx:xhr:progress
     * @see https://htmx.org/attributes/hx-on/
     */
    onXhrProgress: 'hx-on--xhr-progress',
} as const;
