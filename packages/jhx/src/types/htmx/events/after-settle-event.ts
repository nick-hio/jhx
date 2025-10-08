import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxAfterSettleEventProperties =
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

export interface HtmxAfterSettleEvent extends HtmxDomEvent {
    detail: Detail<HtmxAfterSettleEventProperties>;
    type: 'htmx:afterSettle';
}
