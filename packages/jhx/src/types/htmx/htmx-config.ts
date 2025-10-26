import type { HtmxSwapStyle } from './constants';
import type { HtmxHttpVerb } from './htmx-http-verb.ts';
import type { HtmxResponseHandlingConfig } from './htmx-response-handling-config.ts';

/**
 * @see https://htmx.org/reference/#config
 */
export type HtmxConfig = {
    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    addedClass: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    allowEval: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    allowNestedOobSwaps: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    allowScriptTags: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    attributesToSettle: string[];

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    defaultFocusScroll: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    defaultSettleDelay: number;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    defaultSwapDelay: number;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    defaultSwapStyle: HtmxSwapStyle | (string & {});

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    disableInheritance: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    disableSelector: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    getCacheBusterParam: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    globalViewTransitions: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    historyCacheSize: number;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    historyEnabled: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    historyRestoreAsHxRequest: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    ignoreTitle: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    includeIndicatorStyles: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    indicatorClass: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    inlineScriptNonce: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    inlineStyleNonce: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    methodsThatUseUrlParams: HtmxHttpVerb[];

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    refreshOnHistoryMiss: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    requestClass: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    responseHandling: HtmxResponseHandlingConfig[];

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    scrollBehavior: 'auto' | 'instant' | 'smooth';

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    scrollIntoViewOnBoost: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    selfRequestsOnly: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    settlingClass: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    swappingClass: string;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    timeout: number;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    triggerSpecsCache: any | null;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    withCredentials: boolean;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    wsBinaryType: BinaryType;

    /**
     * ...
     *
     * @see https://htmx.org/reference/#config
     */
    wsReconnectDelay: 'full-jitter' | ((retryCount: number) => number);
};
