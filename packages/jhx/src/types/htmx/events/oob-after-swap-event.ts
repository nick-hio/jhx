import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxOobAfterSwapEventProperties = 'elt' | 'fragment' | 'shouldSwap' | 'target';

export interface HtmxOobAfterSwapEvent extends HtmxDomEvent {
    detail: Detail<HtmxOobAfterSwapEventProperties>;
    type: 'htmx:oobAfterSwap';
}
