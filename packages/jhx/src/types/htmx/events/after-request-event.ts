import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxAfterRequestEventProperties =
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

export interface HtmxAfterRequestEvent extends HtmxDomEvent {
    detail: Detail<HtmxAfterRequestEventProperties>;
    type: 'htmx:afterRequest';
}
