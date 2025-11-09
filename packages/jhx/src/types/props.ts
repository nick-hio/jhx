import type { DomEventProps } from './dom-event-props.ts';
import type { HtmxEventProps } from './htmx-event-props';
import type { HtmxProps } from './htmx-props';
import type { JhxRouteProps } from './method-props';

/**
 * Properties for configuring HTMX behavior, events, and methods.
 * @template TDom Type for additional parameters received from the DOM.
 */
export type JhxProps<TDom extends object = object> = HtmxProps<TDom>
    & HtmxEventProps<TDom>
    & JhxRouteProps & {};

/**
 * Properties for configuring HTMX behavior, events, methods, and standard DOM events.
 * @template TDom Type for additional parameters received from the DOM.
 */
export type JhxDomProps<TDom extends object = object> = HtmxProps<TDom>
    & HtmxEventProps<TDom>
    & JhxRouteProps
    & DomEventProps<TDom> & {};
