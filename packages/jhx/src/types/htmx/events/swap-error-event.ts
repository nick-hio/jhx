import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxSwapErrorEventProperties = 'elt' | 'requestConfig' | 'target' | 'xhr';

export interface HtmxSwapErrorEvent extends HtmxDomEvent {
    detail: Detail<HtmxSwapErrorEventProperties>;
    type: 'htmx:swapError';
}
