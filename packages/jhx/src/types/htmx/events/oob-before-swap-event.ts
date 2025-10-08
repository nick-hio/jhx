import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxOobBeforeSwapEventProperties = 'elt' | 'fragment' | 'shouldSwap' | 'target';

export interface HtmxOobBeforeSwapEvent extends HtmxDomEvent {
    detail: Detail<HtmxOobBeforeSwapEventProperties>;
    type: 'htmx:oobBeforeSwap';
}
