import type { HtmxEventProps } from '../htmx-event-props';

export type HtmxEvent = Parameters<Exclude<HtmxEventProps[keyof HtmxEventProps], undefined>>[0];
