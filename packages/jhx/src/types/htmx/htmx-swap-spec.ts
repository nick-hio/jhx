import type { HtmxSwapStyle } from './constants';

export interface HtmxSwapSpec {
    /**
     * Vertical scroll offset to apply after the swap completes.
     */
    scroll: number;

    /**
     * Time in milliseconds to wait before initiating the swap’s settle phase.
     */
    settleDelay: number;

    /**
     * Time in milliseconds to wait before performing the actual content swap.
     */
    swapDelay: number;

    /**
     * Strategy for swapping content (e.g., “innerHTML”, “outerHTML”).
     */
    swapStyle: HtmxSwapStyle;
}
