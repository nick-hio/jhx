import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeSwapEventProperties =
    | 'boosted'
    | 'elt'
    | 'etc'
    | 'ignoreTitle'
    | 'isError'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'selectOverride'
    | 'serverResponse'
    | 'shouldSwap'
    | 'swapOverride'
    | 'target'
    | 'xhr';

export interface HtmxBeforeSwapEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeSwapEventProperties>;
    type: 'htmx:beforeSwap';
}
