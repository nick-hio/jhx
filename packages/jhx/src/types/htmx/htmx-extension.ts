import type { HtmxSwapStyle } from './constants';
import type { HtmxEvent } from './htmx-event.ts';
import type { HtmxSettleInfo } from './htmx-settle-info.ts';

export interface HtmxExtension<T extends CustomEvent = CustomEvent & HtmxEvent> {
    /**
     * Initializes the extension with the HTMX API.
     */
    init?: (api: any) => void;

    /**
     * Intercepts HTMX events dispatched on elements.
     * Return `false` to prevent default HTMX handling.
     */
    onEvent?: (name: string, event: T) => boolean;

    /**
     * Transforms the raw response text before swapping into the DOM.
     */
    transformResponse?: (text: string, xhr: XMLHttpRequest, elt: Element) => string;

    /**
     * Determines if a swap style should be treated as inline insertion.
     */
    isInlineSwap?: (swapStyle: HtmxSwapStyle) => boolean;

    /**
     * Custom handler for swapping content into the target node.
     */
    handleSwap?: (
        swapStyle: HtmxSwapStyle,
        target: Node,
        fragment: Node,
        settleInfo: HtmxSettleInfo,
    ) => boolean | Node[];

    /**
     * Encodes request parameters before sending via `XMLHttpRequest`.
     */
    encodeParameters?: (xhr: XMLHttpRequest, parameters: FormData, elt: Node) => any | string | null;

    /**
     * Provides additional selectors for HTMX to initialize.
     */
    getSelectors?: () => string[] | null;
}
