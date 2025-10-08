import type { DomObjects } from './dom-objects.ts';
import type {
    HtmxAbortEvent,
    HtmxAfterOnLoadEvent,
    HtmxAfterProcessNodeEvent,
    HtmxAfterRequestEvent,
    HtmxAfterSettleEvent,
    HtmxAfterSwapEvent,
    HtmxBeforeCleanupElementEvent,
    HtmxBeforeHistorySaveEvent,
    HtmxBeforeOnLoadEvent,
    HtmxBeforeProcessNodeEvent,
    HtmxBeforeRequestEvent,
    HtmxBeforeSendEvent,
    HtmxBeforeSwapEvent,
    HtmxBeforeTransitionEvent,
    HtmxConfigRequestEvent,
    HtmxConfirmEvent,
    HtmxHistoryCacheErrorEvent,
    HtmxHistoryCacheHitEvent,
    HtmxHistoryCacheMissEvent,
    HtmxHistoryCacheMissLoadErrorEvent,
    HtmxHistoryCacheMissLoadEvent,
    HtmxHistoryRestoreEvent,
    HtmxLoadEvent,
    HtmxNoSseSourceErrorEvent,
    HtmxOnLoadErrorEvent,
    HtmxOobAfterSwapEvent,
    HtmxOobBeforeSwapEvent,
    HtmxOobErrorNoTargetEvent,
    HtmxPromptEvent,
    HtmxPushedIntoHistoryEvent,
    HtmxReplacedInHistoryEvent,
    HtmxResponseErrorEvent,
    HtmxSendAbortEvent,
    HtmxSendErrorEvent,
    HtmxSseErrorEvent,
    HtmxSseOpenEvent,
    HtmxSwapErrorEvent,
    HtmxTargetErrorEvent,
    HtmxTimeoutEvent,
    HtmxValidateUrlEvent,
    HtmxValidationFailedEvent,
    HtmxValidationHaltedEvent,
    HtmxValidationValidateEvent,
    HtmxXhrAbortEvent,
    HtmxXhrLoadendEvent,
    HtmxXhrLoadstartEvent,
    HtmxXhrProgressEvent,
} from './htmx';

export interface HtmxEventProps<TDom extends object = object> {
    /* HTMX event */
    onAbort?: (args: { event: HtmxAbortEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onAfterOnLoad?: (args: { event: HtmxAfterOnLoadEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onAfterProcessNode?: (args: { event: HtmxAfterProcessNodeEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onAfterRequest?: (args: { event: HtmxAfterRequestEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onAfterSettle?: (args: { event: HtmxAfterSettleEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onAfterSwap?: (args: { event: HtmxAfterSwapEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeCleanupElement?: (args: { event: HtmxBeforeCleanupElementEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeOnLoad?: (args: { event: HtmxBeforeOnLoadEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeProcessNode?: (args: { event: HtmxBeforeProcessNodeEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeRequest?: (args: { event: HtmxBeforeRequestEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeSwap?: (args: { event: HtmxBeforeSwapEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeSend?: (args: { event: HtmxBeforeSendEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeTransition?: (args: { event: HtmxBeforeTransitionEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onConfigRequest?: (args: { event: HtmxConfigRequestEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onConfirm?: (args: { event: HtmxConfirmEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onHistoryCacheError?: (args: { event: HtmxHistoryCacheErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onHistoryCacheHit?: (args: { event: HtmxHistoryCacheHitEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onHistoryCacheMiss?: (args: { event: HtmxHistoryCacheMissEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onHistoryCacheMissLoadError?: (
        args: { event: HtmxHistoryCacheMissLoadErrorEvent } & DomObjects & TDom,
    ) => void;
    /* HTMX event */
    onHistoryCacheMissLoad?: (args: { event: HtmxHistoryCacheMissLoadEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onHistoryRestore?: (args: { event: HtmxHistoryRestoreEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onBeforeHistorySave?: (args: { event: HtmxBeforeHistorySaveEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onLoad?: (args: { event: HtmxLoadEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onNoSSESourceError?: (args: { event: HtmxNoSseSourceErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onOnLoadError?: (args: { event: HtmxOnLoadErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onOobAfterSwap?: (args: { event: HtmxOobAfterSwapEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onOobBeforeSwap?: (args: { event: HtmxOobBeforeSwapEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onOobErrorNoTarget?: (args: { event: HtmxOobErrorNoTargetEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onPrompt?: (args: { event: HtmxPromptEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onPushedIntoHistory?: (args: { event: HtmxPushedIntoHistoryEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onReplacedInHistory?: (args: { event: HtmxReplacedInHistoryEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onResponseError?: (args: { event: HtmxResponseErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onSendAbort?: (args: { event: HtmxSendAbortEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onSendError?: (args: { event: HtmxSendErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onSseError?: (args: { event: HtmxSseErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onSseOpen?: (args: { event: HtmxSseOpenEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onSwapError?: (args: { event: HtmxSwapErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onTargetError?: (args: { event: HtmxTargetErrorEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onTimeout?: (args: { event: HtmxTimeoutEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onValidateUrl?: (args: { event: HtmxValidateUrlEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onValidationValidate?: (args: { event: HtmxValidationValidateEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onValidationFailed?: (args: { event: HtmxValidationFailedEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onValidationHalted?: (args: { event: HtmxValidationHaltedEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onXhrAbort?: (args: { event: HtmxXhrAbortEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onXhrLoadend?: (args: { event: HtmxXhrLoadendEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onXhrLoadstart?: (args: { event: HtmxXhrLoadstartEvent } & DomObjects & TDom) => void;
    /* HTMX event */
    onXhrProgress?: (args: { event: HtmxXhrProgressEvent } & DomObjects & TDom) => void;
}
