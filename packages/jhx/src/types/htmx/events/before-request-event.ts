import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeRequestEventProperties =
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

export interface HtmxBeforeRequestEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeRequestEventProperties>;
    type: 'htmx:beforeRequest';
}
