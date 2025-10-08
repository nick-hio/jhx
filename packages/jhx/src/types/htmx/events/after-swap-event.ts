import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxAfterSwapEventProperties =
    | 'boosted'
    | 'elt'
    | 'etc'
    | 'failed'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'successful'
    | 'target'
    | 'xhr';

export interface HtmxAfterSwapEvent extends HtmxDomEvent {
    detail: Detail<HtmxAfterSwapEventProperties>;
    type: 'htmx:afterSwap';
}
