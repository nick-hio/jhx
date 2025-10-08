import type {
    HtmxAjaxHelperContext,
    HtmxExtension,
    HtmxSwapSpecification,
    HttpVerb,
    SwapOptions,
} from 'htmx.org';

import type { Duration } from '../duration.ts';
import type { HtmxConfig } from './htmx-config.ts';

export interface HtmxInstance {
    _: (str: string) => any;

    /**
     * Adds a class to the given element.
     */
    addClass: (elt: Element | string, clazz: string, delay?: Duration) => void;

    /**
     * Issues an htmx-style ajax request.
     */
    ajax: (verb: HttpVerb, path: string, context: Element | string | HtmxAjaxHelperContext) => Promise<void>;

    /**
     * Finds the closest parent to the given element matching the selector.
     */
    closest: (elt: Element | string, selector: string) => Element | null;

    /**
     * A property that holds the current htmx config object.
     */
    config: HtmxConfig;

    /**
     * A property holding the function to create SSE EventSource objects for htmx,
     */
    createEventSource: (url: string) => EventSource;

    /**
     * A property holding the function to create WebSocket objects for htmx.
     */
    createWebSocket: (url: string) => WebSocket;

    /**
     * 	Defines an htmx [extension](https://htmx.org/extensions).
     */
    defineExtension: (name: string, extension: Partial<HtmxExtension>) => void;

    /**
     * Finds a single element matching the selector.
     */
    find: (eltOrSelector: ParentNode | string, selector?: string) => Element | null;

    /**
     * Finds all elements matching a given selector.
     */
    findAll: {
        (): NodeListOf<Element>;
        (eltOrSelector: ParentNode | string, selector?: string): NodeListOf<Element>;
    };

    /**
     * A property that holds the current window location (URL).
     */
    location: Location;

    /**
     * Installs a logger that will log all htmx events.
     */
    logAll: () => void;

    /**
     * Removes the existing logger.
     */
    logNone: () => void;

    /**
     *  A property set to the current logger (default is `null`).
     */
    logger: any;

    /**
     * Removes an event listener from the given element.
     */
    off: (arg1: EventTarget | string, arg2: string | EventListener, arg3?: EventListener) => EventListener;

    /**
     * Creates an event listener on the given element, returning it.
     */
    on: (
        arg1: EventTarget | string,
        arg2: string | EventListener,
        arg3?: EventListener | any | boolean,
        arg4?: any | boolean,
    ) => EventListener;

    /**
     * Adds a callback handler for the `htmx:load` event.
     */
    onLoad: (callback: (elt: Node) => void) => EventListener;

    /**
     * Parses an interval declaration into a millisecond value.
     */
    parseInterval: (str: string) => number | undefined;

    /**
     * Processes the given element and its children, hooking up any htmx behavior.
     */
    process: (elt: Element | string) => void;

    /**
     * Removes the given element.
     */
    remove: (elt: Node, delay?: Duration) => void;

    /**
     * Removes a class from the given element.
     */
    removeClass: (node: Node | string, clazz: string, delay?: Duration) => void;

    /**
     * Removes an htmx [extension](https://htmx.org/extensions).
     */
    removeExtension: (name: string) => void;

    /**
     * Performs swapping (and settling) of HTML content.
     */
    swap: (
        target: string | Element,
        content: string,
        swapSpec: HtmxSwapSpecification,
        swapOptions?: SwapOptions,
    ) => void;

    /**
     * Takes a class from other elements for the given element.
     */
    takeClass: (elt: Node | string, clazz: string) => void;

    /**
     * 	Toggles a class from the given element.
     */
    toggleClass: (elt: Element | string, clazz: string) => void;

    /**
     * Triggers an event on an element.
     */
    trigger: (elt: EventTarget | string, eventName: string, detail?: any | undefined) => boolean;

    /**
     * Returns the input values associated with the given element.
     */
    values: (elt: Element, type: HttpVerb) => any;

    /**
     * Current htmx version.
     */
    version: string;
}
